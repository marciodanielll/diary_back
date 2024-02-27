import { IncomingMessage, ServerResponse } from 'node:http';

import {
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common';
import { blue, gray, green, isColorSupported } from 'colorette';
import { PinoRequestConverter } from 'convert-pino-request-to-curl';
import { LevelWithSilent, Logger, multistream, pino } from 'pino';
import { HttpLogger, Options, pinoHttp } from 'pino-http';
import pinoPretty from 'pino-pretty';
import { v4 as uuidv4 } from 'uuid';

import { DateUtils } from '@/utils/date';
import { BaseException } from '@/utils/exception';

import { ILoggerAdapter } from './adapter';
import { ErrorType, MessageType } from './types';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService implements ILoggerAdapter {
  private app: string;

  httpLogger: HttpLogger;

  async connect<T = LevelWithSilent>(
    logLevel: T,
    mongoUrl: string,
    mongoProd: string,
    nodeEnv: string,
  ): Promise<void> {
    const pinoHttpConfig = pino(
      {
        level: (
          [logLevel, 'trace'].find(Boolean) as LevelWithSilent
        ).toString(),
      },
      multistream([
        {
          level: 'trace',
          stream: pinoPretty(this.getPinoConfig()),
        },
        {
          level: 'info',
          stream: pino.transport({
            target: 'pino-mongodb',
            options: {
              uri: nodeEnv === 'production' ? mongoProd : mongoUrl,
              collection: 'logs',
            },
          }),
        },
      ]),
    );

    this.httpLogger = pinoHttp(this.getPinoHttpConfig(pinoHttpConfig));
  }

  setApplication(app: string): void {
    this.app = app;
  }

  setGlobalParameters(input: object): void {
    this.httpLogger.logger.setBindings(input);
  }

  log(message: string): void {
    this.httpLogger.logger.trace(green(message));
  }

  debug({ message, context, obj = {} }: MessageType): void {
    Object.assign(obj, { context, createdAt: DateUtils.getISODateString() });
    this.httpLogger.logger.trace(
      [obj, gray(message)].find(Boolean),
      gray(message),
    );
  }

  info({ message, context, obj = {} }: MessageType): void {
    Object.assign(obj, { context, createdAt: DateUtils.getISODateString() });
    this.httpLogger.logger.info([obj, message].find(Boolean), message);
  }

  warn({ message, context, obj = {} }: MessageType): void {
    Object.assign(obj, { context, createdAt: DateUtils.getISODateString() });
    this.httpLogger.logger.warn([obj, message].find(Boolean), message);
  }

  error(error: ErrorType, message?: string, context?: string): void {
    const errorResponse = this.getErrorResponse(error);

    const response =
      error instanceof BaseException
        ? {
            statusCode: error['statusCode'],
            message: error?.message,
            ...error?.parameters,
          }
        : errorResponse?.value();

    const type = {
      Error: BaseException.name,
    }[error?.name];

    const messageFind = [message, response?.message, error.message].find(
      Boolean,
    );

    this.httpLogger.logger.error(
      {
        ...response,
        context: error?.context ?? context,
        type: [type, error?.name].find(Boolean),
        traceid: this.getTraceId(error),
        createdAt: DateUtils.getISODateString(),
        application: this.app,
        stack: error.stack,
        ...error?.parameters,
        message: messageFind,
      },
      messageFind,
    );
  }

  fatal(error: ErrorType, message?: string, context?: string): void {
    this.httpLogger.logger.fatal(
      {
        message: error.message || message,
        context: error?.context ?? context,
        type: error.name,
        traceid: this.getTraceId(error),
        createdAt: DateUtils.getISODateString(),
        application: this.app,
        stack: error.stack,
      },
      error.message || message,
    );
    process.exit(1);
  }

  private getPinoConfig() {
    return {
      colorize: isColorSupported,
      levelFirst: true,
      ignore: 'pid,hostname',
      quietReqLogger: true,
      messageFormat: (log: Record<string, any>, messageKey: string) => {
        const message = log[String(messageKey)];
        if (this.app) {
          return `[${blue(this.app)}] ${message}`;
        }

        return message;
      },
      customPrettifiers: {
        time: () => {
          return `[${DateUtils.getDateStringWithFormat()}]`;
        },
      },
    };
  }

  private getPinoHttpConfig(pinoLogger: Logger): Options {
    return {
      logger: pinoLogger,
      quietReqLogger: true,
      customSuccessMessage: (_req: IncomingMessage, res: ServerResponse) => {
        return `request ${res.statusCode >= 400 ? 'error' : 'success'} with status code: ${res.statusCode}`;
      },

      customErrorMessage: (
        _req: IncomingMessage,
        res: ServerResponse,
        error: Error,
      ) => {
        return `request ${error.name} with status code: ${res.statusCode} `;
      },

      customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken',
        reqId: 'traceid',
      },

      serializers: {
        err: () => false,
        req: (request) => {
          return {
            method: request.method,
            curl: PinoRequestConverter.getCurl(request),
          };
        },
        res: pino.stdSerializers.res,
      },

      customProps: (
        req: IncomingMessage & { context: string; protocol: string },
      ): object => {
        const context = req.context;
        const traceid = [req?.headers?.traceid, req.id].find(Boolean);
        const path = `${req.protocol}://${req.headers.host}${req.url}`;

        this.httpLogger.logger.setBindings({
          traceid,
          application: this.app,
          context: context,
          createdAt: DateUtils.getISODateString(),
        });

        return {
          traceid,
          application: this.app,
          context: context,
          path,
          createdAt: DateUtils.getISODateString(),
        };
      },
      customLogLevel: (
        _req: IncomingMessage,
        res: ServerResponse,
        error: Error,
      ) => {
        if ([res.statusCode >= 400, error].some(Boolean)) {
          return 'error';
        }

        if ([res.statusCode >= 300, res.statusCode <= 400].every(Boolean)) {
          return 'silent';
        }

        return 'info';
      },
    };
  }

  private getErrorResponse(error: ErrorType): any {
    const isFunction = typeof error?.getResponse === 'function';

    return [
      {
        conditional: typeof error === 'string',
        value: () => new InternalServerErrorException(error).getResponse(),
      },
      {
        conditional: isFunction && typeof error.getResponse() === 'string',
        value: () =>
          new BaseException(
            error.getResponse() as string,
            [error.getStatus(), error['status']].find(Boolean),
          ).getResponse(),
      },
      {
        conditional: isFunction && typeof error.getResponse() === 'object',
        value: () => error?.getResponse(),
      },
      {
        conditional: [
          error?.name === Error.name,
          error?.name == TypeError.name,
        ].some(Boolean),
        value: () =>
          new InternalServerErrorException(error.message).getResponse(),
      },
    ].find((c) => c.conditional);
  }

  private getTraceId(error: ErrorType): string {
    if (typeof error === 'string') return uuidv4();

    return [error.traceid, this.httpLogger.logger.bindings()?.traceid].find(
      Boolean,
    );
  }
}
