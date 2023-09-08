import { Column, Entity, Unique } from 'typeorm';
import { IdentifiedEntity } from '../../service/util/model/entity/identified.entity';

@Entity({ name: 'blog' })
@Unique(['name'])
export class BlogEntity extends IdentifiedEntity {
    
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    shortDescription: string;

    @Column({ nullable: false })      
    isPublished: boolean;

    @Column({ nullable: false })
    htmlLinkId: string;
}