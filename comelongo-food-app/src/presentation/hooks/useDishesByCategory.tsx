import { useEffect, useState } from 'react';
import { mealApiFetcher } from '@config/adapters/mealApi.adapter';
import * as UseCases from '@core/use-cases';
import type { Dish } from '@domain/entities';

export const useDishesByCategory = (category: string) => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const data = await UseCases.getDishesByCategoryUseCase(mealApiFetcher(), category);
                setDishes(data);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [category]);

    return { dishes, isLoading };
};
