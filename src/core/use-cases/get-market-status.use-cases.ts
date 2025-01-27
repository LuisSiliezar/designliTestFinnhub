import { HttpAdapter } from '@config/adapters/http';
import { MarketStatus } from '@domain/entities';
import { StocksMapper } from '@infrastructure/mappers';
import { StockMarketStatusResponse } from '@infrastructure/interfaces';

export const GetMarketStatusUseCases = async (fetcher: HttpAdapter): Promise<MarketStatus> => {
//    !ENDPOINT NOT RETURNING THE CORRECT DATA (FINNHUB ISSUE)
    try {
        const marketResponse = await fetcher.get<StockMarketStatusResponse>('stock/market-status', {
            token: process.env.API_KEY,
        });

        const currentMarketStatus = StocksMapper.fromAPIStockMarketStatusResultToLocalEntity(marketResponse);

        return currentMarketStatus;

    } catch (error) {
        console.error('Error fetching stocks:', error);
        return {};
    }
};
