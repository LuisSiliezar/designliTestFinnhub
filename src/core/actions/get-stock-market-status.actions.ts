import { MarketStatus } from '@domain/entities';
import { stocksAPIFetcher } from '@config/adapters/stocksApi.adapter';
import { GetMarketStatusUseCases } from '@core/use-cases';

export const getStockMarketStatus = async (): Promise<MarketStatus> => {
    try {
        const marketStatus = await GetMarketStatusUseCases(stocksAPIFetcher());

        return marketStatus;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        return {};
    }
};
