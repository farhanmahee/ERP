
import { Controller, Post, Body, Req, UnauthorizedException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { erpInsightFlow } from '../../../../genkit/src/index'; // Adjust path to your Genkit flow
import { run } from '@genkit-ai/core';

@ApiTags('AI')
@Controller('ai')
@ApiBearerAuth()
export class AiController {
  private readonly logger = new Logger(AiController.name);

  // The AiService is no longer needed here.
  constructor() {}

  @Post('chat')
  @ApiOperation({ summary: 'Chat with Gemini about ERP data using Genkit' })
  async chat(@Body() body: { message: string }, @Req() req: any) {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID is required for AI analysis.');
    }

    try {
      this.logger.log(`Executing erpInsightFlow for tenant: ${tenantId}`);
      
      // Run the Genkit flow with the required input
      const response = await run(erpInsightFlow, { 
        tenantId,
        message: body.message 
      });

      // Return the text response
      return { text: response };

    } catch (error) {
      this.logger.error('Error executing Genkit flow', error);
      throw new InternalServerErrorException('An error occurred while processing your request with the AI.');
    }
  }
}
