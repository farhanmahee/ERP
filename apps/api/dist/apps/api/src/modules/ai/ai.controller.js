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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AiController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../../../genkit/src/index");
const core_1 = require("@genkit-ai/core");
let AiController = AiController_1 = class AiController {
    constructor() {
        this.logger = new common_1.Logger(AiController_1.name);
    }
    async chat(body, req) {
        const tenantId = req.headers['x-tenant-id'];
        if (!tenantId) {
            throw new common_1.UnauthorizedException('Tenant ID is required for AI analysis.');
        }
        try {
            this.logger.log(`Executing erpInsightFlow for tenant: ${tenantId}`);
            const response = await (0, core_1.run)(index_1.erpInsightFlow, {
                tenantId,
                message: body.message
            });
            return { text: response };
        }
        catch (error) {
            this.logger.error('Error executing Genkit flow', error);
            throw new common_1.InternalServerErrorException('An error occurred while processing your request with the AI.');
        }
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, swagger_1.ApiOperation)({ summary: 'Chat with Gemini about ERP data using Genkit' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
exports.AiController = AiController = AiController_1 = __decorate([
    (0, swagger_1.ApiTags)('AI'),
    (0, common_1.Controller)('ai'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [])
], AiController);
//# sourceMappingURL=ai.controller.js.map