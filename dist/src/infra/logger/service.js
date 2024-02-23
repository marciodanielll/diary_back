"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const colorette_1 = require("colorette");
const convert_pino_request_to_curl_1 = require("convert-pino-request-to-curl");
const pino_1 = require("pino");
const pino_http_1 = require("pino-http");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const uuid_1 = require("uuid");
const date_1 = require("../../utils/date");
const exception_1 = require("../../utils/exception");
let LoggerService = class LoggerService {
    async connect(logLevel, mongoUrl, mongoProd, nodeEnv) {
        const pinoHttpConfig = (0, pino_1.pino)({
            level: [logLevel, 'trace'].find(Boolean).toString(),
        }, (0, pino_1.multistream)([
            {
                level: 'trace',
                stream: (0, pino_pretty_1.default)(this.getPinoConfig()),
            },
            {
                level: 'info',
                stream: pino_1.pino.transport({
                    target: 'pino-mongodb',
                    options: {
                        uri: nodeEnv === 'production' ? mongoProd : mongoUrl,
                        collection: 'logs',
                    },
                }),
            },
        ]));
        this.httpLogger = (0, pino_http_1.pinoHttp)(this.getPinoHttpConfig(pinoHttpConfig));
    }
    setApplication(app) {
        this.app = app;
    }
    setGlobalParameters(input) {
        this.httpLogger.logger.setBindings(input);
    }
    log(message) {
        this.httpLogger.logger.trace((0, colorette_1.green)(message));
    }
    debug({ message, context, obj = {} }) {
        Object.assign(obj, { context, createdAt: date_1.DateUtils.getISODateString() });
        this.httpLogger.logger.trace([obj, (0, colorette_1.gray)(message)].find(Boolean), (0, colorette_1.gray)(message));
    }
    info({ message, context, obj = {} }) {
        Object.assign(obj, { context, createdAt: date_1.DateUtils.getISODateString() });
        this.httpLogger.logger.info([obj, message].find(Boolean), message);
    }
    warn({ message, context, obj = {} }) {
        Object.assign(obj, { context, createdAt: date_1.DateUtils.getISODateString() });
        this.httpLogger.logger.warn([obj, message].find(Boolean), message);
    }
    error(error, message, context) {
        const errorResponse = this.getErrorResponse(error);
        const response = error instanceof exception_1.BaseException
            ? {
                statusCode: error['statusCode'],
                message: error?.message,
                ...error?.parameters,
            }
            : errorResponse?.value();
        const type = {
            Error: exception_1.BaseException.name,
        }[error?.name];
        const messageFind = [message, response?.message, error.message].find(Boolean);
        this.httpLogger.logger.error({
            ...response,
            context: error?.context ?? context,
            type: [type, error?.name].find(Boolean),
            traceid: this.getTraceId(error),
            createdAt: date_1.DateUtils.getISODateString(),
            application: this.app,
            stack: error.stack,
            ...error?.parameters,
            message: messageFind,
        }, messageFind);
    }
    fatal(error, message, context) {
        this.httpLogger.logger.fatal({
            message: error.message || message,
            context: error?.context ?? context,
            type: error.name,
            traceid: this.getTraceId(error),
            createdAt: date_1.DateUtils.getISODateString(),
            application: this.app,
            stack: error.stack,
        }, error.message || message);
        process.exit(1);
    }
    getPinoConfig() {
        return {
            colorize: colorette_1.isColorSupported,
            levelFirst: true,
            ignore: 'pid,hostname',
            quietReqLogger: true,
            messageFormat: (log, messageKey) => {
                const message = log[String(messageKey)];
                if (this.app) {
                    return `[${(0, colorette_1.blue)(this.app)}] ${message}`;
                }
                return message;
            },
            customPrettifiers: {
                time: () => {
                    return `[${date_1.DateUtils.getDateStringWithFormat()}]`;
                },
            },
        };
    }
    getPinoHttpConfig(pinoLogger) {
        return {
            logger: pinoLogger,
            quietReqLogger: true,
            customSuccessMessage: (_req, res) => {
                return `request ${res.statusCode >= 400 ? 'error' : 'success'} with status code: ${res.statusCode}`;
            },
            customErrorMessage: (_req, res, error) => {
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
                        curl: convert_pino_request_to_curl_1.PinoRequestConverter.getCurl(request),
                    };
                },
                res: pino_1.pino.stdSerializers.res,
            },
            customProps: (req) => {
                const context = req.context;
                const traceid = [req?.headers?.traceid, req.id].find(Boolean);
                const path = `${req.protocol}://${req.headers.host}${req.url}`;
                this.httpLogger.logger.setBindings({
                    traceid,
                    application: this.app,
                    context: context,
                    createdAt: date_1.DateUtils.getISODateString(),
                });
                return {
                    traceid,
                    application: this.app,
                    context: context,
                    path,
                    createdAt: date_1.DateUtils.getISODateString(),
                };
            },
            customLogLevel: (_req, res, error) => {
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
    getErrorResponse(error) {
        const isFunction = typeof error?.getResponse === 'function';
        return [
            {
                conditional: typeof error === 'string',
                value: () => new common_1.InternalServerErrorException(error).getResponse(),
            },
            {
                conditional: isFunction && typeof error.getResponse() === 'string',
                value: () => new exception_1.BaseException(error.getResponse(), [error.getStatus(), error['status']].find(Boolean)).getResponse(),
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
                value: () => new common_1.InternalServerErrorException(error.message).getResponse(),
            },
        ].find((c) => c.conditional);
    }
    getTraceId(error) {
        if (typeof error === 'string')
            return (0, uuid_1.v4)();
        return [error.traceid, this.httpLogger.logger.bindings()?.traceid].find(Boolean);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], LoggerService);
//# sourceMappingURL=service.js.map