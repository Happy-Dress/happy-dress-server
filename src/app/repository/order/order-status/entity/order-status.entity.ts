import { Column, Entity } from 'typeorm';
import { IdentifiedEntity } from '../../../../service/util/model/entity/identified.entity';

@Entity({ name: 'order-status' })
export class OrderStatusEntity extends IdentifiedEntity {
    @Column({ nullable: false, unique: true })
    name: string;
}