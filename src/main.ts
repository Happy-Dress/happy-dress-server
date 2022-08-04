import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

const DEFAULT_PORT = 8080;

async function bootstrap(): Promise<void> {
  config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(parseInt(process.env.PORT, 10) || DEFAULT_PORT);
}
bootstrap();
