import { HttpAdapter } from '@config/adapters/http';
import { DishMapper } from '@infrastructure/mappers';
import type { Dish } from '@domain/entities';
import type { MealsListResponse } from '@infrastructure/interfaces';

export const searchDishesUseCase = async (
    fetcher: HttpAdapter,
    query: string,
): Promise<Dish[]> => {
    try {
        const response = await fetcher.get<MealsListResponse>('search.php', {
            params: { s: query },
        });
        return (response.meals ?? []).map(DishMapper.fromMealResponseToEntity);
    } catch (error) {
        console.error(`Error searching dishes for "${query}":`, error);
        return [];
    }
};
