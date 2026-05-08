import { HttpAdapter } from '@config/adapters/http';
import { DishMapper } from '@infrastructure/mappers';
import type { Dish } from '@domain/entities';
import type { MealsListResponse } from '@infrastructure/interfaces';

export const getDishDetailUseCase = async (
    fetcher: HttpAdapter,
    id: string,
): Promise<Dish | null> => {
    try {
        const response = await fetcher.get<MealsListResponse>('lookup.php', {
            params: { i: id },
        });
        const meal = response.meals?.[0];
        if (!meal) return null;
        return DishMapper.fromMealResponseToEntity(meal);
    } catch (error) {
        console.error(`Error fetching dish ${id}:`, error);
        return null;
    }
};
