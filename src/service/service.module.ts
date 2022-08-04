import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/impl/authentication.service';
import { RepositoryModule } from '../repository/repository.module';
import { IAuthenticationService } from './authentication/authentication.service.abstraction';
import { ClientModule } from '../client/client.module';

@Module({
    imports: [
        RepositoryModule,
        ClientModule,
    ],
    providers: [
        {
            provide: IAuthenticationService,
            useClass: AuthenticationService,
        },
    ],
    exports: [IAuthenticationService],
})
export class ServiceModule {}
