import {
  MAX_AMOUNT,
} from '../../service/image/constants/validate-image/validate-image.constants';

// Image upload messages
export const INVALID_EXTENSION_MESSAGE = 'Неверное расширение файла: $current. Доступные расширения: $valid.';
export const INVALID_SIZE_MESSAGE = 'Файл должен быть более $min Мб и не более $max Мб. Текущий размер файла: $current Мб.';
export const FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE = 'Ошибка загрузки фото на google-drive';

export const FAILED_DOWNLOAD_GOOGLE_DRIVE_MESSAGE = 'Ошибка загрузки фото с google-drive';
export const INVALID_IMAGES_AMOUNT_MESSAGE = `Можно загрузить не более ${MAX_AMOUNT} изображений`;
export const NULL_FILES_DETECTED = 'При отправке запроса на сервер файлы не могут быть пустым значением';

// Authentication messages
export const INVALID_LOGIN_OR_PASSWORD = 'Неверный логин или пароль';
export const INVALID_LOGIN_FORMAT = 'Имя должно содержать латинские буквы и цифры';
export const INVALID_PASSWORD_FORMAT = 'Пароль должен содержать латинские буквы, цифры и символы ? ! & / . , ” \\\'\'';
export const LOGIN_TOO_SHORT = 'Имя должно содержать не менее 4 имволов';
export const LOGIN_TOO_LONG = 'Имя должно содержать не более 35 имволов';
export const PASSWORD_TOO_SHORT = 'Пароль должен содержать не менее 4 имволов';
export const PASSWORD_TOO_LONG = 'Пароль должен содержать не более 15 имволов';

// Global dress options messages
export const NAME_TOO_SHORT = 'Имя должно содержать более 3 символов';
export const NAME_TOO_LONG = 'Имя должно содержать не более 30 символов';
export const DESCRIPTION_TOO_SHORT = 'Описание должно содержать более 3 символов';
export const DESCRIPTION_TOO_LONG = 'Описание должно содержать не более 100 символов';
export const INVALID_EXTENSION_OR_NOT_EXISTS_FILE_DETECTED = 'Данное расширение не поддерживается или отсутсвует файл';
export const INVALID_COLOR_DETECTED = 'Неверная кодировка цвета';
export const INVALID_LENGTH_COLOR = 'Кодировка цвета должна содержать 7 символов';
export const INVALID_NAME_DETECTED = 'В названии содержатся неразрешенные символы';
export const INVALID_DESCRIPTION_DETECTED = 'В описании содержатся неразрешенные символы';
export const UNABLE_TO_FIND_BY_IDS = 'Невозможно найти / обновить сущность(-и) в $ENTITY_NAME с id: $ID';

export const ENTITY_NOT_FOUND_BY_FIELDS = 'Сущность $ENTITY_NAME не найдена по полям: $FIELDS';

export const ENTITIES_DO_NOT_MATCH_BY_IDS = 'Сущности $ENTITY_1 и $ENTITY_2 не совпадают по ID';

export const INVALID_ID_TO_UPDATE = '$name не найдены по id: $ID';
export const INVALID_GOOGLE_DRIVE_LINK = 'Неверная ссылка на фотографию в google-drive';

export const FIELD_MUST_BE_STRING = 'Поле $FIELD должно быть строкой';

export const INVALID_BOOLEAN_FIELD = 'Поле $FIELD должно быть булевым значением';


//Products constants
export const PRODUCT_NAME_TOO_SHORT = 'Имя товара должно содержать более 3 символов';
export const PRODUCT_NAME_TOO_LONG = 'Имя товара должно содержать не более 30 символов';
export const INVALID_PRODUCT_NAME = 'Имя товара должно содержать только буквы и цифры (без пробелов)';
export const INVALID_TYPE_ID = 'ID должно быть числом в $TYPE';
export const PRODUCT_DESCRIPTION_TOO_SHORT = 'Описание товара должно содержать более 3 символов';
export const PRODUCT_DESCRIPTION_TOO_LONG = 'Описание товара должно содержать не более 200 символов';

export const INVALID_PRODUCT_DESCRIPTION = 'Неверное описание товара';

export const EMPTY_FIELD = 'Поле $TYPE является обязательным';

//Crud service
export const DUPLICATE_ENTRY_ENTITY = 'Дублирующее значение в сущности $ENTITY_NAME';
// orderNumber validation
export const INVALID_ORDER_NUMBER = 'Неверные порядковые номера в $DTO_NAME';

//Blog constants
export const BLOG_NAME_TOO_SHORT = 'Имя блога должно содержать более 3 символов';
export const BLOG_NAME_TOO_LONG = 'Имя блога должно содержать не более 25 символов';
export const INVALID_BLOG_NAME = 'Имя блога должно содержать только буквы и цифры (без пробелов)';
export const BLOG_SHORT_DESCRIPTION_TOO_SHORT = 'Краткое описание должно содержать более 3 символов';
export const BLOG_SHORT_DESCRIPTION_TOO_LONG = 'Краткое описание должно содержать не более 200 символов';
export const INVALID_BLOG_SHORT_DESCRIPTION = 'Краткое описание должно содержать только буквы и цифры (без пробелов)';
