import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AiService } from './ai.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
@ApiBearerAuth()
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Chat with Gemini 3 Pro about ERP data' })
  async chat(@Body() body: { message: string }, @Req() req: any) {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
       // Ideally handled by middleware, but redundant check for safety
       throw new UnauthorizedException('Tenant context required for AI analysis');
    }
    
    // Pass tenantId to service to ensure data isolation during function calls
    return this.aiService.processChat(body.message, tenantId);
  }
}