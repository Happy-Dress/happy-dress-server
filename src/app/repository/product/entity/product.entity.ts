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
    mainImageUrl: string;

    @ManyToOne(() => CategoryEntity, { nullable: false, eager: true, onDelete: 'CASCADE' })
    category: CategoryEntity;

    @ManyToOne(() => ModelEntity, { nullable: false, eager: true, onDelete: 'CASCADE' })
    model: ModelEntity;

    @ManyToMany(() => MaterialEntity, { nullable: false, eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'product-material' })
    materials: MaterialEntity[];
}
