import { Controller, Get, Inject } from '@nestjs/common';
import { ISettingsService } from '../../../../service/settings/settings.service.abstraction';
import { GlobalDressOptionsDto } from '../../../../service/settings/model/global-dress-options.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {

    @Inject()
    private settingsService: ISettingsService;

    @Get()
    @ApiOkResponse({
      description: 'successful get global dress options',
      type: GlobalDressOptionsDto,
    })
    async get(): Promise<GlobalDressOptionsDto> {
      return this.settingsService.getGlobalDressOptions();
    }
}
