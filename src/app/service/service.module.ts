import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/impl/authentication.service';
import { RepositoryModule } from '../repository/repository.module';
import { IAuthenticationService } from './authentication/authentication.service.abstraction';
import { ClientModule } from '../client/client.module';
import { IImageService } from './image/image.service.abstraction';
import { ImageService } from './image/impl/image.service';
import { ImageValidator } from './image/validator/image.validator';

@Module({
    providers: [
        {
            provide: IAuthenticationService,
            useClass: AuthenticationService,
        },
        {
            provide: IImageService,
            useClass: ImageService,
        },
        ImageValidator,
    ],
    imports: [
        RepositoryModule,
        ClientModule,
    ],
    exports: [IAuthenticationService, IImageService],
})
export class ServiceModule {}
