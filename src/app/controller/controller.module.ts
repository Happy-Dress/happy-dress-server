import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { ServiceModule } from '../service/service.module';
import { ImageController } from './image/image.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
    imports: [
        ServiceModule,
        NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    ],
    controllers: [
        AuthenticationController,
        ImageController,
    ],
    providers: [],
})
export class ControllerModule {}
