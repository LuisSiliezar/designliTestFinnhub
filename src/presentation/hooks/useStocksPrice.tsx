import { useState, useEffect } from 'react';
import { Stock } from '@domain/entities';
import { getStockPrices } from '@core/actions';

export const useStocksPrice = () => {
    const [stockData, setStockData] = useState<Stock[]>([]);

    useEffect(() => {

        const stockWatchlist = [
            'AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA',
            'META', 'NFLX', 'NVDA', 'AMD', 'INTC',
            'SPY', 'BABA', 'DIS', 'BA', 'V',
            'PYPL', 'CSCO', 'IBM', 'NKE', 'KO',
            'PEP', 'JNJ', 'PFE', 'MRK', 'MCD',
        ];

        const fetchStockData = async () => {
            const stocks = await getStockPrices(stockWatchlist);
            setStockData(stocks);
        };

        fetchStockData();
    }, []);

    return {
        stockData,
    };
};
