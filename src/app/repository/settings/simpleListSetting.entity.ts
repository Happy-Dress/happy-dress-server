import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SimpleListSettingEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column()
    name: string;

}