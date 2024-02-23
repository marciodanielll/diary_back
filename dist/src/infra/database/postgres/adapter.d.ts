import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare abstract class IDatabaseService implements OnModuleInit, OnModuleDestroy {
    abstract onModuleInit(): Promise<void>;
    abstract onModuleDestroy(): Promise<void>;
    abstract query<T>(text: string, params?: unknown[]): Promise<T>;
}
