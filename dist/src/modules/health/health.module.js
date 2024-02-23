"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthModule = void 0;
const common_1 = require("@nestjs/common");
const health_controller_1 = require("./health.controller");
const postgres_1 = require("../../infra/database/postgres");
const logger_1 = require("../../infra/logger");
const secrets_1 = require("../../infra/secrets");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [postgres_1.DatabaseModule, logger_1.LoggerModule, secrets_1.SecretsModule],
        controllers: [health_controller_1.HealthController],
        providers: [
            {
                provide: postgres_1.IDatabaseService,
                useFactory: (logger, secretsService) => {
                    return new postgres_1.DatabaseService(logger, secretsService);
                },
                inject: [logger_1.ILoggerAdapter, secrets_1.ISecretsAdapter],
            },
        ],
    })
], HealthModule);
//# sourceMappingURL=health.module.js.map