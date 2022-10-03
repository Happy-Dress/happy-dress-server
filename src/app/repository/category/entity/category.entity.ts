import { Entity } from 'typeorm';
import { SimpleListSettingEntity } from './simpleListSetting.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends SimpleListSettingEntity{
}