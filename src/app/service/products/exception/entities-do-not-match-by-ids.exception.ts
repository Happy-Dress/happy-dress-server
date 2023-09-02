import {
  ENTITIES_DO_NOT_MATCH_BY_IDS,
} from '../../../messages/constants/messages.constants';

export class EntitiesDoNotMatchByIdsException extends Error {
    
    public type: string;

    constructor(firstEntityName: string, secondEntityName: string) {
        super(ENTITIES_DO_NOT_MATCH_BY_IDS
          .replace('$ENTITY_1', firstEntityName)
          .replace('$ENTITY_2', secondEntityName));
    }
}