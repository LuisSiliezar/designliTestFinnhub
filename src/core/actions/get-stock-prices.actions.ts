import { Stock } from '@domain/entities';
import { stocksAPIFetcher } from '@config/adapters/stocksApi.adapter';
import { GetBySymbolStockPriceUseCases } from '@core/use-cases';

export const getStockPrices = async (symbols: string[]): Promise<Stock[]> => {
    const fetchedData: Stock[] = [];

    for (let symbol of symbols) {
        try {
            const currentStock = await GetBySymbolStockPriceUseCases(stocksAPIFetcher(symbol), symbol);
            const currentPrice = currentStock.currentPrice ?? 0;
            fetchedData.push({ symbol, currentPrice });
        } catch (error) {
            console.error(`Error fetching stock price for ${symbol}:`, error);
        }
    }

    return fetchedData;
};
