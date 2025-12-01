import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';
import { CrmModule } from './modules/crm/crm.module';
import { HrModule } from './modules/hr/hr.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { SecurityModule } from './modules/security/security.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AccountingModule,
    InventoryModule,
    SalesModule,
    CrmModule,
    HrModule,
    IntegrationsModule,
    SecurityModule,
    AiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST }
      )
      .forRoutes('*');
  }
}