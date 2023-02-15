import { IdentifiedEntity } from '../model/entity/identified.entity';
import { IdentifiedModel } from '../model/dto/identified.model';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { MultiConverter } from '../converter/multi.converter';
import { Injectable } from '@nestjs/common';
import { EntitiesNotFoundByIdsException } from '../../../exception/entities-not-found-by-ids.exception';
import { EntityDuplicateFieldException } from '../../../exception/entity-duplicate-field.exception';

@Injectable()
export class CrudService<Entity extends IdentifiedEntity, DTO extends IdentifiedModel> {

    protected readonly converter: MultiConverter<Entity, DTO>;

    protected readonly repository: Repository<Entity>;

    private readonly entityName: string;

    constructor(repository: Repository<Entity>, converter: MultiConverter<Entity, DTO>, entityName: string) {
      this.repository = repository;
      this.converter = converter;
      this.entityName = entityName;
    }

    /**
     * @throws {EntitiesNotFoundByIdsException}
     */
    public async update(dtos: DTO[]): Promise<void> {
      const entitiesToInsert = await this.converter.convertToEntities(dtos);
      const existingEntities = await this.repository.find();
      const existingEntitiesIds = existingEntities.map((entity)=> entity.id );
      const entitiesToUpdateIds = entitiesToInsert.map((entity)=> entity.id ).filter(id => !!id);
        this.checkIfPossibleToUpdateByIds(existingEntitiesIds, entitiesToUpdateIds);
        const idsToDelete = existingEntitiesIds.filter(id => !entitiesToUpdateIds.includes(id));
        if (idsToDelete.length) {
          await this.repository.delete(idsToDelete);
        }

        try {
          await this.repository.save(entitiesToInsert);
        } catch (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            throw new EntityDuplicateFieldException(this.entityName);
          }
        }
    }

    public async getAll(): Promise<DTO[]> {
      const entities = await this.repository.find();
      return  this.converter.convertToDTOs(entities);
    }

    public async getById(id: number): Promise<DTO> {
      const entity = await this.repository.findOne({ where: { id: id } as FindOptionsWhere<Entity> });
      return this.converter.convertToDTO(entity);
    }

    public async getEntitiesByIds(ids: Set<number>): Promise<Entity[]> {
      const arrayIds = Array.from(ids);
      const entities = await this.repository.findBy({ id: In(arrayIds) } as FindOptionsWhere<Entity>);
      const entityIds = entities.map(entity => entity.id);
      this.checkIfAllEntitiesFound(arrayIds, entityIds);
      return entities;
    }

    public async getEntityById(id: number): Promise<Entity> {
      const entity = await this.repository.findOne({ where: { id: id } as FindOptionsWhere<Entity> });
      if (entity === null) {
        throw new EntitiesNotFoundByIdsException([id], this.entityName);
      }
      return entity;
    }

    private checkIfPossibleToUpdateByIds(existingEntitiesIds: number[], entitiesToUpdateIds: number[]): void {
      if (existingEntitiesIds.length && entitiesToUpdateIds.length) {
        const invalidIds = entitiesToUpdateIds.filter(id => !existingEntitiesIds.includes(id));
        if (invalidIds.length) {
          throw new EntitiesNotFoundByIdsException(invalidIds, this.entityName);
        }
      }
    }
    
    private checkIfAllEntitiesFound(ids: number[], entityIds: number[]): void {
      const invalidIds = ids.filter(id => !entityIds.includes(id));
      if (invalidIds.length) {
        throw new EntitiesNotFoundByIdsException(invalidIds, this.entityName);
      }
    }
}
