import { Entity, ManyToMany } from 'typeorm';
import { SimpleListSettingEntity } from '../../simpleListSetting.entity';
import { ProductEntity } from '../../../product/entity/product.entity';

@Entity({ name: 'material' })
export class MaterialEntity extends SimpleListSettingEntity {

    @ManyToMany(() => ProductEntity, (product) => product.id)
    products: Promise<ProductEntity[]>;
}