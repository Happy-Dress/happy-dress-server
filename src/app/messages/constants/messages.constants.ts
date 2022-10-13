import {
  MAX_AMOUNT,
} from '../../service/image/constants/validate-image/validate-image.constants';

// Image upload messages
export const INVALID_EXTENSION_MESSAGE = 'Неверное расширение файла: $current. Доступные расширения: $valid.';
export const INVALID_SIZE_MESSAGE = 'Файл должен быть более $min Мб и не более $max Мб. Текущий размер файла: $current Мб.';
export const FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE = 'Ошибка загрузки фото на google-drive';
export const INVALID_IMAGES_AMOUNT_MESSAGE = `Можно загрузить не более ${MAX_AMOUNT} изображений`;
export const NULL_IMAGES_DETECTED = 'При отправке запроса на сервер файлы не могут быть пустым значением';


// Authentication messages
export const INVALID_LOGIN_OR_PASSWORD = 'Неверный логин или пароль';
export const INVALID_LOGIN_FORMAT = 'Имя должно содержать латинские буквы и цифры';
export const INVALID_PASSWORD_FORMAT = 'Пароль должен содержать латинские буквы, цифры и символы ? ! & / . , ” \\\'\'';
export const LOGIN_TOO_SHORT = 'Имя должно содержать не менее 4 имволов';
export const LOGIN_TOO_LONG = 'Имя должно содержать не более 35 имволов';
export const PASSWORD_TOO_SHORT = 'Пароль должен содержать не менее 4 имволов';
export const PASSWORD_TOO_LONG = 'Пароль должен содержать не более 15 имволов';

// Global dress options messages
export const DESCRIPTION_TOO_SHORT = 'Описание должно содержать более 3 символов';
export const DESCRIPTION_TOO_LONG = 'Описание должно содержать не более 20 символов';
export const INVALID_EXTENSION_OR_NOT_EXISTS_FILE_DETECTED = 'Данное расширение не поддерживается или отсутсвует файл';
export const INVALID_DESCRIPTION_DETECTED = 'Содержаться неразрешенные символы';
export const INVALID_ID_TO_UPDATE = '$name не найдены по id: $ID';

