import { UNABLE_TO_UPDATE_BY_IDS } from '../../../messages/constants/messages.constants';

export class EntitiesNotFoundByIdsException extends Error {

    public invalidIds: number[];

    constructor(invalidIds: number[]) {
        super(UNABLE_TO_UPDATE_BY_IDS
          .replace('$ID', invalidIds.toString()));
        this.invalidIds = invalidIds;
    }
}
