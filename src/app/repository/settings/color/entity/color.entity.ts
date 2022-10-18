import { Column, Entity } from 'typeorm';
import { SimpleListSettingEntity } from '../../simpleListSetting.entity';

@Entity({ name: 'color' })
export class ColorEntity extends SimpleListSettingEntity {
    @Column()
    firstColor: string;

    @Column({ nullable: true })
    secondColor: string;
}