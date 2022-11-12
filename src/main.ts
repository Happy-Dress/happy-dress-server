import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './app/controller/exception/excpetion.filter';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

const DEFAULT_PORT = 8080;
const originPath = 'https://happy-dress-client.herokuapp.com/';

async function bootstrap(): Promise<void> {
  config();
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [originPath],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const httpAdapter  = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(parseInt(process.env.PORT, 10) || DEFAULT_PORT);
}
bootstrap();
