import { Stock } from '@domain/entities/stock.entity';
import { stocksAPIFetcher } from '@config/adapters/stocksApi.adapter';
import { useEffect, useState } from 'react';
import * as UseCases from '@core/use-cases';

export const useStocks = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        initialLoadingState();
    }, []);

    const initialLoadingState = async () => {
        setIsLoading(true);
        try {
            const allStocks = await UseCases.allStocksUseCases(stocksAPIFetcher());
            setStocks(allStocks);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        stocks,
    };
};

