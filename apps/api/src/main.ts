import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeFirebase } from './config/firebase.config';

async function bootstrap() {
  initializeFirebase(); // Initialize Firebase

  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ERP API')
    .setDescription('ERP System API')
    .setVersion('1.0')
    .addTag('erp')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();