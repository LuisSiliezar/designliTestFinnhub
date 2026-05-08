import { HttpAdapter } from '@config/adapters/http';
import { CategoryMapper } from '@infrastructure/mappers';
import type { Category } from '@domain/entities';
import type { CategoriesListResponse } from '@infrastructure/interfaces';

export const getCategoriesUseCase = async (fetcher: HttpAdapter): Promise<Category[]> => {
    try {
        const response = await fetcher.get<CategoriesListResponse>('categories.php');
        return (response.categories ?? []).map(CategoryMapper.fromCategoryResponseToEntity);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
