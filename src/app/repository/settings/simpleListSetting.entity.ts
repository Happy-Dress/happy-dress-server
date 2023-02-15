import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['name'])
export class SimpleListSettingEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column()
    name: string;

}