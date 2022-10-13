import { INVALID_ID_TO_UPDATE } from '../../../messages/constants/messages.constants';

export class EntitiesNotFoundByIds extends Error {
  constructor(name: string, invalidIds: number[]) {
        super(INVALID_ID_TO_UPDATE
          .replace('$name', name)
          .replace('$ID', invalidIds.toString()));
  }
}