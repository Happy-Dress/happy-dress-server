import { Entity } from 'typeorm';
import { SimpleListSettingEntity } from '../../simpleListSetting.entity';

@Entity({ name: 'model' })
export class ModelEntity extends SimpleListSettingEntity {
}