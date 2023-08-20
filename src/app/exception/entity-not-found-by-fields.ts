import { ENTITY_NOT_FOUND_BY_FIELDS } from '../messages/constants/messages.constants';

export class EntityNotFoundByFieldsException extends Error {

    public fields: string[];
    public type: string;

    constructor(fields: string[], entityName: string) {
        super(ENTITY_NOT_FOUND_BY_FIELDS
          .replace('$ENTITY_NAME', entityName)
          .replace('$FIELDS', fields.toString()));
        this.fields = fields;
    }
}
