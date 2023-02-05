import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { IdentifiedEntity } from '../../../service/util/model/entity/identified.entity';
import { CategoryEntity } from '../../settings/category/entity/category.entity';
import { ModelEntity } from '../../settings/model/entity/model.entity';
import { MaterialEntity } from '../../settings/material/entity/material.entity';

@Entity({ name: 'product' })
export class ProductEntity extends IdentifiedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CategoryEntity)
    category: Promise<CategoryEntity>;

    @Column()
    categoryId: number;

    @ManyToOne(() => ModelEntity)
    model: Promise<ModelEntity>;

    @Column()
    modelId: number;

    @ManyToMany(() => MaterialEntity, { eager: true })
    @JoinTable({ name: 'product_material' })
    materials: MaterialEntity[];
}