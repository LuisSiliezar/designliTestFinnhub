import { useEffect, useState } from 'react';
import { mealApiFetcher } from '@config/adapters/mealApi.adapter';
import * as UseCases from '@core/use-cases';
import type { Dish } from '@domain/entities';

export const useSearchDishes = (query: string) => {
    const [results, setResults] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                setResults(await UseCases.searchDishesUseCase(mealApiFetcher(), query.trim()));
            } finally {
                setIsLoading(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    return { results, isLoading };
};
