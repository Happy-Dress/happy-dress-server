import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { IdentifiedEntity } from '../../../service/util/model/entity/identified.entity';
import { OrderStatusEntity } from '../order-status/entity/order-status.entity';
import { ProductColorSizeEntity } from '../../product/product-color-size/entity/product-color-size.entity';

@Entity({ name: 'order' })
export class OrderEntity extends IdentifiedEntity {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: false })
    date: Date;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(() => OrderStatusEntity, { nullable: false })
    status: OrderStatusEntity;

    @ManyToMany(() => ProductColorSizeEntity, { nullable: false, eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'product-order' })
    productsOrdered: ProductColorSizeEntity[];
}