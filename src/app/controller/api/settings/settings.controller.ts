import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { ISettingsService } from '../../../service/settings/settings.service.abstraction';
import { GlobalDressOptionsDto } from '../../../service/settings/model/global-dress-options.dto';

@Controller('settings')
export class SettingsController {


    @Inject()
    private settingsService: ISettingsService;

    @Get()
    async get(): Promise<GlobalDressOptionsDto> {
      return this.settingsService.getGlobalDressOptions();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async save(@Body() globalDressOptionsDTO: GlobalDressOptionsDto): Promise<GlobalDressOptionsDto> {
      return this.settingsService.setGlobalDressOptions(globalDressOptionsDTO);
    }

}
