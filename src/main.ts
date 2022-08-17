import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './controller/exception/excpetion.filter';

const DEFAULT_PORT = 8080;

async function bootstrap(): Promise<void> {
  config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const httpAdapter  = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(parseInt(process.env.PORT, 10) || DEFAULT_PORT);
}
bootstrap();
