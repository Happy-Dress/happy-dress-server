import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ISettingsService } from '../../../../service/settings/settings.service.abstraction';
import { GlobalDressOptionsDto } from '../../../../service/settings/model/global-dress-options.dto';
import { JwtAccessAuthGuard } from '../../../security/guards/jwt.access.auth.guard';

@ApiTags('secure_settings')
@Controller('secure/settings')
export class SettingsSecureController {

    @Inject()
    private settingsService: ISettingsService;

    @UseGuards(JwtAccessAuthGuard)
    @Get()
    @ApiOkResponse({
      description: 'successful get global dress options',
      type: GlobalDressOptionsDto,
    })
    async get(): Promise<GlobalDressOptionsDto> {
      return this.settingsService.getGlobalDressOptions();
    }

    @UseGuards(JwtAccessAuthGuard)
    @Post()
    @ApiOkResponse({
      description: 'successful save global dress options',
      type: GlobalDressOptionsDto,
    })
    async save(@Body() globalDressOptionsDTO: GlobalDressOptionsDto): Promise<GlobalDressOptionsDto> {

      return this.settingsService.setGlobalDressOptions(globalDressOptionsDTO);
    }

}