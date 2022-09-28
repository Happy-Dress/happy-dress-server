import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CATEGORY_TOO_LONG, CATEGORY_TOO_SHORT } from '../../../messages/constants/messages.constants';

export const MIN_LENGTH_CATEGORY = 3;
export const MAX_LENGTH_CATEGORY = 20;

export class CategoryDTO{
    id: number;

    @IsString()
    @MinLength(MAX_LENGTH_CATEGORY, { message: CATEGORY_TOO_SHORT })
    @MaxLength(MIN_LENGTH_CATEGORY, { message: CATEGORY_TOO_LONG })
    @Matches(/\w\[!@#$ %^&*()_+\-=\[\]{};':"\\|,.<>\/?]*/)
    description: string;
}