import { UNABLE_TO_FIND_BY_IDS } from '../messages/constants/messages.constants';

export class EntitiesNotFoundByIdsException extends Error {
  public invalidIds: Set<number> | number[];
  public type: string;

  constructor(invalidIds: Set<number> | number[], entityName: string) {
    super(
      UNABLE_TO_FIND_BY_IDS.replace(
        '$ID',
        (invalidIds instanceof Set
          ? Array.from(invalidIds)
          : invalidIds
        ).toString()
      ).replace('$ENTITY_NAME', entityName)
    );
    this.invalidIds = invalidIds;
  }
}
