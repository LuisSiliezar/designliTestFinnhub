import type { Dish } from '@domain/entities';
import type { MealResponse } from '@infrastructure/interfaces';

export class DishMapper {
    static fromMealResponseToEntity(meal: MealResponse): Dish {
        const score = DishMapper.deterministicScore(meal.idMeal);
        return {
            id: meal.idMeal,
            name: meal.strMeal,
            description: meal.strInstructions?.slice(0, 220),
            image: meal.strMealThumb,
            category: meal.strCategory,
            score,
            tags: meal.strTags?.split(',').filter(Boolean),
        };
    }

    private static deterministicScore(id: string): number {
        const hash = id
            .split('')
            .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
        const raw = 6.5 + (hash % 35) / 10;
        return Math.round(raw * 10) / 10;
    }
}
