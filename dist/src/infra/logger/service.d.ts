import { LevelWithSilent } from 'pino';
import { HttpLogger } from 'pino-http';
import { ILoggerAdapter } from './adapter';
import { ErrorType, MessageType } from './types';
export declare class LoggerService implements ILoggerAdapter {
    private app;
    httpLogger: HttpLogger;
    connect<T = LevelWithSilent>(logLevel: T, mongoUrl: string, mongoProd: string, nodeEnv: string): Promise<void>;
    setApplication(app: string): void;
    setGlobalParameters(input: object): void;
    log(message: string): void;
    debug({ message, context, obj }: MessageType): void;
    info({ message, context, obj }: MessageType): void;
    warn({ message, context, obj }: MessageType): void;
    error(error: ErrorType, message?: string, context?: string): void;
    fatal(error: ErrorType, message?: string, context?: string): void;
    private getPinoConfig;
    private getPinoHttpConfig;
    private getErrorResponse;
    private getTraceId;
}
