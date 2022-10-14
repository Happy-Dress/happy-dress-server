import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SimpleListSettingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

}