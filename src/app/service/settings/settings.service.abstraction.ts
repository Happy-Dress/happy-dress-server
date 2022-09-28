import { GlobalDressOptionsDTO } from './model/GlobalDressOptionsDTO';

export abstract class ISettingsService {
  abstract getGlobalDressOptions(): Promise<GlobalDressOptionsDTO>;
  abstract setGlobalDressOptions(categories: GlobalDressOptionsDTO): Promise<GlobalDressOptionsDTO>;
}