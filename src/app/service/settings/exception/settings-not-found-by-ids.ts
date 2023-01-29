import { INVALID_ID_TO_UPDATE } from '../../../messages/constants/messages.constants';

export class SettingsNotFoundByIds extends Error {

  constructor(invalidIds: number[], name: string) {
        super(INVALID_ID_TO_UPDATE
          .replace('$ID', invalidIds.toString())
          .replace('$name', name));

  }
}
