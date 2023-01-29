import { GlobalDressOptionsDto } from './model/global-dress-options.dto';

export abstract class ISettingsService {
  abstract getGlobalDressOptions(): Promise<GlobalDressOptionsDto>;
  abstract setGlobalDressOptions(categories: GlobalDressOptionsDto): Promise<GlobalDressOptionsDto>;
}
