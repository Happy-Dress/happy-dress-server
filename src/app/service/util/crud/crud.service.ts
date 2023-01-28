import {IdentifiedEntity} from "../identified.entity";
import {IdentifiedModel} from "../identified.model";
import {Repository} from "typeorm";
import {MultiConverter} from "../converter/multi.converter";
import {Injectable} from "@nestjs/common";
import {EntitiesNotFoundByIds} from "../../settings/exception/entities-not-found-by.ids";

@Injectable()
export class CrudService<Entity extends IdentifiedEntity, DTO extends IdentifiedModel> {

    private readonly converter: MultiConverter<Entity, DTO>;

    private readonly repository: Repository<Entity>;

    constructor(repository: Repository<Entity>, converter:MultiConverter<Entity, DTO>) {
        this.repository = repository;
        this.converter = converter;
    }


    /**
     * @throws {EntitiesNotFoundByIds}
     */
    public async update(dtos: DTO[]) {
        const entitiesToInsert = this.converter.convertToEntities(dtos);
        const existingEntities = await this.repository.find();
        const existingEntitiesIds = existingEntities.map((entity)=> entity.id );
        const entitiesToUpdateIds = entitiesToInsert.map((entity)=> entity.id ).filter(id => !!id);
        this.checkIfPossibleToUpdateByIds(existingEntitiesIds, entitiesToUpdateIds);

        const idsToDelete = existingEntitiesIds.filter(id => !entitiesToUpdateIds.includes(id));
        if (idsToDelete.length) {
            await this.repository.delete(idsToDelete);
        }
        await this.repository.save(entitiesToInsert);
    }

    public async getAll(): Promise<DTO[]> {
        const entities = await this.repository.find();
        return  this.converter.convertToDTOs(entities);
    }

    private checkIfPossibleToUpdateByIds(existingEntitiesIds: number[], entitiesToUpdateIds: number[]): void {
        if (existingEntitiesIds.length && entitiesToUpdateIds.length) {
            const invalidIds = entitiesToUpdateIds.filter(id => !existingEntitiesIds.includes(id));
            if (invalidIds.length) {
                throw new EntitiesNotFoundByIds(invalidIds);
            }
        }
    }
}
