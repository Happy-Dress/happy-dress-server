import { PrimaryGeneratedColumn } from 'typeorm';

export class IdentifiedEntity {

    @PrimaryGeneratedColumn()
    id: number;
}
