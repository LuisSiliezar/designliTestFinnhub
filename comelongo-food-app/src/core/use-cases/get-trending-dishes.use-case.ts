import { HttpAdapter } from '@config/adapters/http';
import { DishMapper } from '@infrastructure/mappers';
import type { Dish } from '@domain/entities';
import type { MealsListResponse } from '@infrastructure/interfaces';

const TRENDING_LETTERS = ['p', 'b', 's', 't', 'c'];

export const getTrendingDishesUseCase = async (fetcher: HttpAdapter): Promise<Dish[]> => {
    try {
        const responses = await Promise.all(
            TRENDING_LETTERS.map(letter =>
                fetcher.get<MealsListResponse>('search.php', { params: { f: letter } }),
            ),
        );
        const meals = responses.flatMap(r => r.meals ?? []).slice(0, 12);
        return meals.map(DishMapper.fromMealResponseToEntity);
    } catch (error) {
        console.error('Error fetching trending dishes:', error);
        return [];
    }
};
