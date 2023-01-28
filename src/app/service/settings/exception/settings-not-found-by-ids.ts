import {INVALID_ID_TO_UPDATE, UNABLE_TO_UPDATE_BY_IDS} from "../../../messages/constants/messages.constants";

export class SettingsNotFoundByIds extends Error {

    constructor(invalidIds: number[], name: string) {
        super(INVALID_ID_TO_UPDATE
            .replace('$ID', invalidIds.toString())
            .replace('$name', name))

    }
}
