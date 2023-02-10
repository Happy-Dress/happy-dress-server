import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from '../../entity/product.entity';
import { ColorEntity } from '../../../settings/color/entity/color.entity';
import { SizeEntity } from '../../../settings/size/enitity/size.entity';

@Entity('product-color-size')
export class ProductColorSizeEntity {

    @ManyToOne(() => ProductEntity, product => product.id, { onDelete: 'CASCADE' })
    product: ProductEntity;
    
    @ManyToOne(() => ColorEntity, color => color.id, { eager: true, onDelete: 'CASCADE' })
    color: ColorEntity;

    @ManyToOne(() => SizeEntity, size => size.id, { eager: true, onDelete: 'CASCADE' })
    size: SizeEntity;

    @PrimaryColumn()
    isAvailable: boolean;
    
}