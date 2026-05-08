import { useEffect, useState } from 'react';
import { mealApiFetcher } from '@config/adapters/mealApi.adapter';
import * as UseCases from '@core/use-cases';
import type { Dish } from '@domain/entities';

export const useDishDetail = (id: string) => {
    const [dish, setDish] = useState<Dish | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                setDish(await UseCases.getDishDetailUseCase(mealApiFetcher(), id));
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    return { dish, isLoading };
};
