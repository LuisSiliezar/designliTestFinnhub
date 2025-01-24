import { HttpAdapter } from '@config/adapters/http';
import { Stock } from '@domain/entities';
import { StockPriceResponse } from '@infrastructure/interfaces';
import { StocksMapper } from '@infrastructure/mappers';

export const GetBySymbolStockPriceUseCases = async (fetcher: HttpAdapter, symbol: string): Promise<Stock> => {
    try {
        const stocksResponse = await fetcher.get<StockPriceResponse>('quote', {
            symbol: symbol,
            token: process.env.API_KEY,
        });

        if (!stocksResponse || !stocksResponse) {
            throw new Error('Invalid stock response data');
        }
        const currentStockPrice = StocksMapper.fromAPIStockPriceResultToLocalEntity(stocksResponse, symbol);

        return currentStockPrice;

    } catch (error) {
        console.error('Error fetching stocks:', error);
        return {};
    }
};
