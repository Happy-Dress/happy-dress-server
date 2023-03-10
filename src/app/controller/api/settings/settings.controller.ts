/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { ISettingsService } from '../../../service/settings/settings.service.abstraction';
import { GlobalDressOptionsDto } from '../../../service/settings/model/global-dress-options.dto';
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

    @UseGuards(JwtAuthGuard)
    @Post()

    @ApiOkResponse({
      description: 'successful save global dress options',
      type: GlobalDressOptionsDto,
    })
    async save(@Body() globalDressOptionsDTO: GlobalDressOptionsDto): Promise<GlobalDressOptionsDto> {

      return this.settingsService.setGlobalDressOptions(globalDressOptionsDTO);
    }

}
