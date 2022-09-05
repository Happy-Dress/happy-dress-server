import {
  COEFFICIENT_BYTES_TO_MEGABYTES,
  IMAGE_EXTENSIONS,
  MAX_AMOUNT, MAX_IMAGE_SIZE,
  MIN_IMAGE_SIZE,
} from '../../service/image/constants/validate-image/validate-image.constants';

// Image upload messages
export const INVALID_EXTENSION_MESSAGE = 'Неверное расширение файла:';
export const VALID_EXTENSION_MESSAGE = `Доступные расширения: ${IMAGE_EXTENSIONS}`;
export const INVALID_SIZE_MESSAGE = 'Неверный размер файла';
export const VALID_SIZE_MESSAGE = `Файл должен быть более ${MIN_IMAGE_SIZE * COEFFICIENT_BYTES_TO_MEGABYTES} Мб и не более ${MAX_IMAGE_SIZE * COEFFICIENT_BYTES_TO_MEGABYTES} Мб`;
export const CURRENT_SIZE_MESSAGE = 'Текущий размер файла:';
export const FAILED_UPLOAD_GOOGLE_DRIVE_MESSAGE = 'Ошибка загрузки фото на google-drive';
export const INVALID_IMAGES_AMOUNT_MESSAGE = `Можно загрузить не более ${MAX_AMOUNT} изображений`;
export const NULL_IMAGES_DETECTED = 'При отправке запроса на сервер файлы не могут быть пустым значением';


// Authentication messages
export const INVALID_LOGIN_OR_PASSWORD = 'Неверный логин или пароль';
export const INVALID_LOGIN_PASSWORD_FORMAT = 'Невыерный формат логина или пароля';
