"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_middleware_1 = require("./common/middleware/tenant.middleware");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const sales_module_1 = require("./modules/sales/sales.module");
const crm_module_1 = require("./modules/crm/crm.module");
const hr_module_1 = require("./modules/hr/hr.module");
const integrations_module_1 = require("./modules/integrations/integrations.module");
const security_module_1 = require("./modules/security/security.module");
const ai_module_1 = require("./modules/ai/ai.module");
const database_module_1 = require("./modules/database/database.module");
const sync_module_1 = require("./modules/sync/sync.module");
const logging_module_1 = require("./modules/logging/logging.module");
const seeder_module_1 = require("./modules/seeder/seeder.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(tenant_middleware_1.TenantMiddleware)
            .exclude({ path: 'health', method: common_1.RequestMethod.GET }, { path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'auth/register', method: common_1.RequestMethod.POST })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            accounting_module_1.AccountingModule,
            inventory_module_1.InventoryModule,
            sales_module_1.SalesModule,
            crm_module_1.CrmModule,
            hr_module_1.HrModule,
            integrations_module_1.IntegrationsModule,
            security_module_1.SecurityModule,
            ai_module_1.AiModule,
            database_module_1.DatabaseModule,
            sync_module_1.SyncModule,
            logging_module_1.LoggingModule,
            seeder_module_1.SeederModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map