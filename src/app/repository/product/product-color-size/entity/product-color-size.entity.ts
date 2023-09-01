import { Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../entity/product.entity';
import { ColorEntity } from '../../../settings/color/entity/color.entity';
import { SizeEntity } from '../../../settings/size/enitity/size.entity';
import { IdentifiedEntity } from '../../../../service/util/model/entity/identified.entity';

@Entity('product-color-size')
export class ProductColorSizeEntity extends IdentifiedEntity {

    @ManyToOne(() => ProductEntity, product => product.id, { eager: true, onDelete: 'CASCADE' })
    product: ProductEntity;
    
    @ManyToOne(() => ColorEntity, color => color.id, { eager: true, onDelete: 'CASCADE' })
    color: ColorEntity;

    @ManyToOne(() => SizeEntity, size => size.id, { eager: true, onDelete: 'CASCADE' })
    size: SizeEntity;
    
}