import { ENTITES_DO_NOT_MATCH_BY_IDS } from '../../../messages/constants/messages.constants';

export class EntitiesDoNotMatchByIdsException extends Error {
    public invalidIds: number[];
    
    public type: string;

    constructor(invalidIds: number[], firstEntityName: string, secondEntityName: string) {
        super(ENTITES_DO_NOT_MATCH_BY_IDS
          .replace('$ID', invalidIds.toString())
          .replace('$ENTITY_1', firstEntityName)
          .replace('$ENTITY_2', secondEntityName));
        this.invalidIds = invalidIds;
    }
}