import { ConfigService } from '@nestjs/config';
import { ISecretsAdapter } from './adapter';
export declare class SecretsService implements ISecretsAdapter {
    private readonly configService;
    constructor(configService: ConfigService);
    readonly PORT: number;
    readonly LOGGER_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
    readonly MONGO_DB_PORT: number;
    readonly MONGO_DB_HOST: string;
    readonly MONGO_DB_USER: string;
    readonly MONGO_DB_PASSWORD: string;
    readonly MONGO_URL: string;
    readonly TZ: string;
    DATE_FORMAT: string;
    readonly POSTGRES_DB_PORT: number;
    readonly POSTGRES_USER: string;
    readonly POSTGRES_PASSWORD: string;
    readonly POSTGRES_DB: string;
    readonly POSTGRES_HOST: string;
    readonly NODE_ENV: string;
    readonly MONGO_PROD: string;
    readonly POSTGRES_PROD: string;
}
