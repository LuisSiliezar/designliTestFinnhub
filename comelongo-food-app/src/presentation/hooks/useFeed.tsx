import { useEffect, useState } from 'react';
import { getFeedReviews } from '@core/actions';
import type { Review } from '@domain/entities';

export const useFeed = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        setIsLoading(true);
        try {
            const data = await getFeedReviews();
            setReviews(data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    return { reviews, isLoading, error, refresh: load };
};
