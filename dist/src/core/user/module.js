"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const postgres_1 = require("../../infra/database/postgres");
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const user_repository_1 = require("./repository/user.repository");
const secrets_1 = require("../../infra/secrets");
const logger_1 = require("../../infra/logger");
const user_create_1 = require("./use-cases/user.create");
const user_getall_1 = require("./use-cases/user.getall");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [postgres_1.DatabaseModule, logger_1.LoggerModule, secrets_1.SecretsModule],
        controllers: [controller_1.UserController],
        providers: [
            {
                provide: postgres_1.IDatabaseService,
                useFactory: (logger, secretsService) => {
                    return new postgres_1.DatabaseService(logger, secretsService);
                },
                inject: [logger_1.ILoggerAdapter, secrets_1.ISecretsAdapter],
            },
            {
                provide: user_repository_1.UserRepository,
                useFactory: (databaseService) => {
                    return new user_repository_1.UserRepository(databaseService);
                },
                inject: [postgres_1.IDatabaseService],
            },
            {
                provide: user_create_1.UserCreateUseCase,
                useFactory: (userRepository) => {
                    return new user_create_1.UserCreateUseCase(userRepository);
                },
                inject: [user_repository_1.UserRepository],
            },
            {
                provide: user_getall_1.UserGetAllUseCase,
                useFactory: (userRepository) => {
                    return new user_getall_1.UserGetAllUseCase(userRepository);
                },
                inject: [user_repository_1.UserRepository],
            },
        ],
    })
], UserModule);
//# sourceMappingURL=module.js.map