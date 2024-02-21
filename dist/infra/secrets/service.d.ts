import { ConfigService } from '@nestjs/config';
import { ISecretsAdapter } from './adapter';
export declare class SecretsService implements ISecretsAdapter {
    private readonly configService;
    constructor(configService: ConfigService);
    PORT: number;
}
