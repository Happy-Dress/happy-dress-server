import { IdentifiedModel } from '../../util/model/dto/identified.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SizeDto implements IdentifiedModel {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    sizeValue: number;
}