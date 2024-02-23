"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const secrets_1 = require("./infra/secrets/");
const logger_1 = require("./infra/logger");
const package_json_1 = require("../package.json");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    const { PORT } = app.get(secrets_1.ISecretsAdapter);
    const logger = app.get(logger_1.ILoggerAdapter);
    logger.setApplication(package_json_1.name);
    app.useLogger(logger);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle(package_json_1.name)
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(PORT, () => {
        logger.log(`Server is running on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map