import { HttpAdapter } from '@config/adapters/http';
import { DishMapper } from '@infrastructure/mappers';
import type { Dish } from '@domain/entities';
import type { MealsListResponse } from '@infrastructure/interfaces';

export const getDishesByCategoryUseCase = async (
    fetcher: HttpAdapter,
    category: string,
): Promise<Dish[]> => {
    try {
        const response = await fetcher.get<MealsListResponse>('filter.php', {
            params: { c: category },
        });
        return (response.meals ?? []).map(DishMapper.fromMealResponseToEntity);
    } catch (error) {
        console.error(`Error fetching dishes for category ${category}:`, error);
        return [];
    }
};
