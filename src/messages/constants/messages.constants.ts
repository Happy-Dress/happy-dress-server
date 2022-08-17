import { MAX_AMOUNT } from '../../service/image/constants/validate-image/validate-image.constants';

// Image upload messages
export const INVALID_EXTENSION = 'Неверное расширение файла:';
export const INVALID_SIZE = 'Неверный размер файла';
export const FAILED_UPLOAD_GOOGLE_DRIVE = 'Ошибка загрузки фото на google-drive';
export const INVALID_IMAGES_AMOUNT = `Можно загрузить не более ${MAX_AMOUNT} изображений`;