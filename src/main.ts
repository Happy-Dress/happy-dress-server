import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './app/controller/exception/excpetion.filter';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';

const DEFAULT_PORT = 8080;

async function bootstrap(): Promise<void> {
  config();
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.ORIGIN_PATH],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const httpAdapter  = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const docConfig = new DocumentBuilder()
    .setTitle('happy-dress-server')
    .setDescription('happy-dress-server API description')
    .setVersion('1.0')
    .addTag('authentication')
    .addTag('health')  
    .addTag('images')
    .addTag('products')
    .addTag('settings')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('doc', app, document);

  await writeFile('./.swagger/swagger.json', JSON.stringify(document));
  
  await app.listen(parseInt(process.env.PORT, 10) || DEFAULT_PORT);

  
}
bootstrap();
