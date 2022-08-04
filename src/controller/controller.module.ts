import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { ServiceModule } from '../service/service.module';

@Module({
    imports: [ServiceModule],
    controllers: [AuthenticationController],
    providers: [],
})
export class ControllerModule {}
