import { Entity } from 'typeorm';
import { SimpleListSettingEntity } from '../../simpleListSetting.entity';

@Entity({ name: 'material' })
export class MaterialEntity extends SimpleListSettingEntity {}