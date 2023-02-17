import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IdentifiedEntity } from '../../../../service/util/model/entity/identified.entity';

@Entity('size')
export class SizeEntity extends IdentifiedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sizeValue: number;
}