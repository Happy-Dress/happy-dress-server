import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { IdentifiedEntity } from '../../../service/util/model/entity/identified.entity';
import { CategoryEntity } from '../../settings/category/entity/category.entity';
import { ModelEntity } from '../../settings/model/entity/model.entity';

@Entity({ name: 'product' })
export class ProductEntity extends IdentifiedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn()
    category: Promise<CategoryEntity>;

    @Column()
    categoryId: number;

    @ManyToOne(() => ModelEntity)
    @JoinColumn()
    model: Promise<ModelEntity>;

    @Column()
    modelId: number;
}