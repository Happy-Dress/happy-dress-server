import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'color' })
export class ColorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstColor: string;

    @Column({ nullable: true })
    secondColor: string;
}