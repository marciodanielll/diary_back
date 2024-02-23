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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SecretsService = class SecretsService {
    constructor(configService) {
        this.configService = configService;
        this.PORT = Number(this.configService.get('PORT'));
        this.LOGGER_LEVEL = this.configService.get('LOGGER_LEVEL');
        this.MONGO_DB_PORT = Number(this.configService.get('MONGO_DB_PORT'));
        this.MONGO_DB_HOST = this.configService.get('MONGO_DB_HOST');
        this.MONGO_DB_USER = this.configService.get('MONGO_INITDB_ROOT_USERNAME');
        this.MONGO_DB_PASSWORD = this.configService.get('MONGO_INITDB_ROOT_PASSWORD');
        this.MONGO_URL = `mongodb://${this.MONGO_DB_USER}:${this.MONGO_DB_PASSWORD}@${this.MONGO_DB_HOST}:${this.MONGO_DB_PORT}`;
        this.TZ = this.configService.get('TZ');
        this.DATE_FORMAT = this.configService.get('DATE_FORMAT');
        this.POSTGRES_DB_PORT = Number(this.configService.get('POSTGRES_DB_PORT'));
        this.POSTGRES_USER = this.configService.get('POSTGRES_USER');
        this.POSTGRES_PASSWORD = this.configService.get('POSTGRES_PASSWORD');
        this.POSTGRES_DB = this.configService.get('POSTGRES_DB');
        this.POSTGRES_HOST = this.configService.get('POSTGRES_HOST');
        this.NODE_ENV = this.configService.get('NODE_ENV');
        this.MONGO_PROD = this.configService.get('MONGO_PROD');
        this.POSTGRES_PROD = this.configService.get('POSTGRES_PROD');
    }
};
exports.SecretsService = SecretsService;
exports.SecretsService = SecretsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SecretsService);
//# sourceMappingURL=service.js.map