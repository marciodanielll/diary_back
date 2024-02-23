import { ILoggerAdapter } from '@/infra/logger';
import { ISecretsAdapter } from '@/infra/secrets';
import { QueryResultRow } from 'pg';
import { IDatabaseService } from './adapter';
export declare class DatabaseService implements IDatabaseService {
    private static instance;
    private pool;
    private logger;
    private secretsService;
    private context;
    constructor(logger: ILoggerAdapter, secretsService: ISecretsAdapter);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    query<T>(text: string, params?: unknown[]): Promise<T & QueryResultRow>;
}
