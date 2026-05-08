import type { Category } from '@domain/entities';
import type { CategoryResponse } from '@infrastructure/interfaces';

export class CategoryMapper {
    static fromCategoryResponseToEntity(c: CategoryResponse): Category {
        return {
            id: c.idCategory,
            name: c.strCategory,
            image: c.strCategoryThumb,
            description: c.strCategoryDescription,
        };
    }
}
