import { Column, Entity, ManyToOne } from 'typeorm';
import { IdentifiedEntity } from '../../../../service/util/model/entity/identified.entity';
import { ProductEntity } from '../../entity/product.entity';
import { ColorEntity } from '../../../settings/color/entity/color.entity';

@Entity('product-color-image')
export class ProductColorImageEntity extends IdentifiedEntity {

    @ManyToOne(() => ProductEntity, product => product.id, { eager: true, onDelete: 'CASCADE' })
    product: ProductEntity;
    
    @ManyToOne(() => ColorEntity, color => color.id, { eager: true, onDelete: 'CASCADE' })
    color: ColorEntity;

    @Column({ type: 'simple-array', nullable: true })
    imageUrls: string[];
}