import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['name'])
export class SimpleListSettingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}