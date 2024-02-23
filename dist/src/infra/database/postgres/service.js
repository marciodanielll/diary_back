"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const logger_1 = require("../../logger");
const secrets_1 = require("../../secrets");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(logger, secretsService) {
        this.context = DatabaseService_1.name;
        if (!DatabaseService_1.instance) {
            this.logger = logger;
            this.secretsService = secretsService;
            if (this.secretsService.NODE_ENV === 'production') {
                this.pool = new pg_1.Pool({
                    connectionString: this.secretsService.POSTGRES_PROD,
                });
            }
            else {
                this.pool = new pg_1.Pool({
                    user: this.secretsService.POSTGRES_USER,
                    host: this.secretsService.POSTGRES_HOST,
                    database: this.secretsService.POSTGRES_DB,
                    password: this.secretsService.POSTGRES_PASSWORD,
                    port: this.secretsService.POSTGRES_DB_PORT,
                });
            }
            this.logger.info({
                message: 'Connect with success in postgres',
            });
            DatabaseService_1.instance = this;
        }
        else {
            return DatabaseService_1.instance;
        }
    }
    async onModuleInit() {
        try {
            await this.pool.connect();
        }
        catch (err) {
            this.logger.error(err, 'Error to connect in postgres');
        }
    }
    async onModuleDestroy() {
        await this.pool.end();
        this.logger.info({
            message: 'Disconnect with success in postgres',
            context: this.context,
        });
    }
    async query(text, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(text, params);
            return result;
        }
        finally {
            client.release();
        }
    }
};
exports.DatabaseService = DatabaseService;
DatabaseService.instance = null;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.ILoggerAdapter, secrets_1.ISecretsAdapter])
], DatabaseService);
//# sourceMappingURL=service.js.map