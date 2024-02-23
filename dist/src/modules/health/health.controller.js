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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const package_json_1 = require("../../../package.json");
const postgres_1 = require("../../infra/database/postgres");
let HealthController = class HealthController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getHealth() {
        const result = await this.databaseService.query(``);
        if (result) {
            return `Service ${package_json_1.name} is running version ${package_json_1.version}`;
        }
        return 'Service is down';
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('/health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('health'),
    __metadata("design:paramtypes", [postgres_1.IDatabaseService])
], HealthController);
//# sourceMappingURL=health.controller.js.map