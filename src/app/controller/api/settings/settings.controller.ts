import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { GlobalDressOptionsDTO } from '../../../service/settings/model/GlobalDressOptionsDTO';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { ISettingsService } from '../../../service/settings/settings.service.abstraction';

@Controller('settings')
export class SettingsController {


    @Inject()
    private settingsService: ISettingsService;

    @Get()
    async get(): Promise<GlobalDressOptionsDTO> {
      return this.settingsService.getGlobalDressOptions();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async save(@Body() globalDressOptionsDTO: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO> {
      return this.settingsService.setGlobalDressOptions(globalDressOptionsDTO);
    }

}