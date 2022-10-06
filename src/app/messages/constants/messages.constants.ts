import {
  MAX_AMOUNT,
} from '../../service/image/constants/validate-image/validate-image.constants';
import { MAX_LENGTH_CATEGORY, MIN_LENGTH_CATEGORY } from '../../service/settings/model/SimpleListSetting';


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
export const CATEGORY_TOO_SHORT = `Название категории должно содержать более ${MIN_LENGTH_CATEGORY - 1} символов`;
export const CATEGORY_TOO_LONG = `Название категории должно содержать не более ${MAX_LENGTH_CATEGORY} символов`;
export const NULL_SETTINGS_DETECTED = 'При отправке запроса на сервер список параметров платьев не может быть пустым значением';
export const INVALID_DESCRIPTION_DETECTED = 'Содержаться неразрешенные символы';

