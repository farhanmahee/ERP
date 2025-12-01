import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    
    // Assuming user.role is populated (e.g., 'ADMIN')
    // In a real DB call, we might join the Role table. 
    // For this implementation, we assume the JWT payload contains the role name.
    return requiredRoles.includes(user?.role);
  }
}
