export abstract class MultiConverter<Entity, DTO> {
  abstract convertToDTOs(entities: Entity[]): DTO[];
  abstract convertToEntities(dtos: DTO[]): Entity[];
}
