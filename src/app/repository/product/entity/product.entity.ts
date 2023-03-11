import { Column, Entity, ManyToOne, ManyToMany, JoinTable, Unique } from 'typeorm';
import { IdentifiedEntity } from '../../../service/util/model/entity/identified.entity';
import { CategoryEntity } from '../../settings/category/entity/category.entity';
import { ModelEntity } from '../../settings/model/entity/model.entity';
import { MaterialEntity } from '../../settings/material/entity/material.entity';

@Entity({ name: 'product' })
@Unique(['name'])
export class ProductEntity extends IdentifiedEntity {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    orderNumber: number;

    @ManyToOne(() => CategoryEntity, { eager: true, onDelete: 'SET NULL' })
    category: CategoryEntity;

    @ManyToOne(() => ModelEntity, { eager: true, onDelete: 'SET NULL' })
    model: ModelEntity;

    @ManyToMany(() => MaterialEntity, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'product-material' })
    materials: MaterialEntity[];
}
