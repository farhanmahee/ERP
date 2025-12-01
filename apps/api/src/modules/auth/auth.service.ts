import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string, tenantId: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email, tenantId },
      include: { role: true }
    });

    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      tenantId: user.tenantId,
      role: user.role?.name 
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role?.name
      }
    };
  }

  async register(data: any, tenantId: string) {
    // Check if user exists in this tenant
    const existing = await this.prisma.user.findFirst({
      where: { email: data.email, tenantId }
    });

    if (existing) {
      throw new ConflictException('User already exists in this tenant');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Get default role (e.g., ID 4 for 'ACCOUNTANT' or lookup by name)
    // For MVP, assuming Roles 1=Admin, 2=Manager, 3=Cashier, 4=Accountant created via seed
    const defaultRole = await this.prisma.role.findFirst({ where: { name: 'ACCOUNTANT' } }); 

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        fullName: data.fullName,
        phone: data.phone,
        tenantId: tenantId,
        roleId: defaultRole ? defaultRole.id : 1 // Fallback or handle error
      },
      include: { role: true }
    });

    return this.login(user);
  }
}
