import { LevelWithSilent } from 'pino';
import { HttpLogger } from 'pino-http';
import { ErrorType, MessageType } from './types';
export declare abstract class ILoggerAdapter<T extends HttpLogger = HttpLogger> {
    abstract httpLogger: T;
    abstract connect<TLevel = LevelWithSilent>(logLevel: TLevel, mongoUrl: string, mongoProd: string, nodeEnv: string): void;
    abstract setApplication(app: string): void;
    abstract log(message: string): void;
    abstract debug({ message, context, obj }: MessageType): void;
    abstract info({ message, context, obj }: MessageType): void;
    abstract warn({ message, context, obj }: MessageType): void;
    abstract error(error: ErrorType, message?: string, context?: string): void;
    abstract fatal(error: ErrorType, message?: string, context?: string): void;
    abstract setGlobalParameters(input: object): void;
}
