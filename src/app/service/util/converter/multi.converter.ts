import { IdentifiedEntity } from '../model/entity/identified.entity';
import { IdentifiedModel } from '../model/dto/identified.model';
import { MethodNotAllowedException } from '@nestjs/common';

export abstract class MultiConverter<Entity extends IdentifiedEntity, DTO extends IdentifiedModel> {
  convertToDTOs(entities: Entity[]): Promise<DTO[]> {
    return Promise.all(entities.map(entity => this.convertToDTO(entity)));
  }
  
  convertToEntities(dtos: DTO[]): Promise<Entity[]> {
    return Promise.all(dtos.map(dto => this.convertToEntity(dto)));
  }

  convertToDTO(entity: Entity): Promise<DTO> {
    throw new MethodNotAllowedException(entity);
  }

  convertToEntity(dto: DTO): Promise<Entity> {
    throw new MethodNotAllowedException(dto);
  }

}
