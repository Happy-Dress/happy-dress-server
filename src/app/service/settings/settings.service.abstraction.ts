import { GlobalDressOptionsDto } from './model/global-dress-options.dto';
import {SettingType} from "./util/constant/setting.type.enum";
import {IdentifiedEntity} from "../util/model/entity/identified.entity";

export abstract class ISettingsService {
  abstract getGlobalDressOptions(): Promise<GlobalDressOptionsDto>;
  abstract setGlobalDressOptions(categories: GlobalDressOptionsDto): Promise<GlobalDressOptionsDto>;
  abstract getSettingEntityById<Entity extends IdentifiedEntity>(id: number, type: SettingType): Promise<Entity>;
  abstract getSettingEntitiesByIds<Entity extends IdentifiedEntity>(ids: number[], type: SettingType): Promise<Entity[]>
}
