import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
       // In a production environment, this might check subdomains or default to a public tenant
       // For this MVP, strict header check ensures isolation awareness
       throw new UnauthorizedException('X-Tenant-ID header is missing');
    }

    // Attach tenantId to request object for use in Guards/Services/Prisma
    req['tenantId'] = tenantId;
    next();
  }
}
