import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { ServiceModule } from '../service/service.module';
import { ImageController } from './image/image.controller';

@Module({
    imports: [
        ServiceModule,
    ],
    controllers: [
        AuthenticationController,
        ImageController,
    ],
    providers: [],
})
export class ControllerModule {}
