import { useState, useEffect } from 'react';
import { Stock } from '@domain/entities';
import { getStockPrices } from '@core/actions';

export const useStocksPrice = () => {
    const [stockData, setStockData] = useState<Stock[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const stockWatchlist = [
            'AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA',
            'META', 'NFLX', 'NVDA', 'AMD', 'INTC',
            'SPY', 'BABA', 'DIS', 'BA', 'V',
            'PYPL', 'CSCO', 'IBM', 'NKE', 'KO',
            'PEP', 'JNJ', 'PFE', 'MRK', 'MCD',
        ];

        setIsLoading(true);
        setError(null);

        const fetchStockData = async () => {
            try {
                const stocks = await getStockPrices(stockWatchlist);
                setStockData(stocks);
            } catch (err: any) {
                setError('Failed to load stock data. Please try again later.');
                console.error('Error fetching stock data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStockData();
    }, []);

    return {
        stockData,
        isLoading,
        error,
    };
};
