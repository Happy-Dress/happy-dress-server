import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SimpleListSettingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    orderNumber: number;

}