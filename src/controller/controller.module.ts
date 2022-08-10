import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { ServiceModule } from '../service/service.module';
import { ClientModule } from '../client/client.module';
import { DressController } from './dress/dress.controller';

@Module({
    imports: [
        ServiceModule,
        ClientModule,
    ],
    controllers: [
        AuthenticationController,
        DressController,
    ],
    providers: [],
})
export class ControllerModule {}
