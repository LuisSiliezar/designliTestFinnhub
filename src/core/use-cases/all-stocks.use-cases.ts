import { HttpAdapter } from '@config/adapters/http';
import { StocksMapper } from '@infrastructure/mappers';
import type { Stock } from '@domain/entities';
import type { StockResponse } from '@infrastructure/interfaces';

export const allStocksUseCases = async (fetcher: HttpAdapter): Promise<Stock[]> => {
  try {
    const stocksResponse = await fetcher.get<StockResponse[]>('stock/symbol', {
      exchange: 'US',
      token: process.env.API_KEY,
    });

    const allStocks = stocksResponse.map(StocksMapper.fromAPIStocksResultToLocalEntity);

    return allStocks;

  } catch (error) {
    console.error('Error fetching stocks:', error);
    return [];
  }
};
