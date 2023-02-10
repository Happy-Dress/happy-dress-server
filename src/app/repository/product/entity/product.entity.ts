import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IdentifiedEntity } from '../../../service/util/model/entity/identified.entity';
import { CategoryEntity } from '../../settings/category/entity/category.entity';
import { ModelEntity } from '../../settings/model/entity/model.entity';
import { MaterialEntity } from '../../settings/material/entity/material.entity';
import { ProductColorSizeEntity } from '../../product-color-size/entity/product-color-size.entity';

@Entity({ name: 'product' })
export class ProductEntity extends IdentifiedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => CategoryEntity, { eager: true, onDelete: 'SET NULL' })
    category: CategoryEntity;

    @ManyToOne(() => ModelEntity, { eager: true, onDelete: 'SET NULL' })
    model: ModelEntity;

    @ManyToMany(() => MaterialEntity, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'product_material' })
    materials: MaterialEntity[];

    @OneToMany(() => ProductColorSizeEntity, productColorSize => productColorSize.product, { eager: true })
    productColorSize: ProductColorSizeEntity[];
}
