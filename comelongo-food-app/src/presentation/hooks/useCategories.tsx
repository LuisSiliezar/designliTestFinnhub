import { useEffect, useState } from 'react';
import { getCategories } from '@core/actions';
import type { Category } from '@domain/entities';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setCategories(await getCategories());
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { categories, isLoading };
};
