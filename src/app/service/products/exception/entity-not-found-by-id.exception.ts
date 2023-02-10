import { UNABLE_TO_FIND_BY_ID } from '../../../messages/constants/messages.constants';

export class EntityNotFoundByIdException extends Error {
  constructor(invalidId: number) {
        super(UNABLE_TO_FIND_BY_ID.replace('$ID', invalidId.toString()), );
  }
}