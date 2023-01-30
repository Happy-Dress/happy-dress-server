import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IdentifiedEntity } from '../../../service/util/model/entity/identified.entity';

@Entity({ name: 'goods' })
export class GoodEntity extends IdentifiedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}