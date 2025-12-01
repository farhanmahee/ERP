import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async login(@Body() body: any, @Req() req: any) {
    const tenantId = req.headers['x-tenant-id'];
    const user = await this.authService.validateUser(body.email, body.password, tenantId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user for tenant' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  async register(@Body() body: any, @Req() req: any) {
    const tenantId = req.headers['x-tenant-id'];
    return this.authService.register(body, tenantId);
  }
}
