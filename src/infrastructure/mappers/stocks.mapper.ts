import type { MarketStatus, Stock } from '@domain/entities';
import type { StockMarketStatusResponse, StockPriceResponse, StockResponse } from '@infrastructure/interfaces';

export class StocksMapper {
    static fromAPIStocksResultToLocalEntity(result: StockResponse): Stock {
        return {
            symbol: result.symbol,
            name: result.description,
        };
    }

    static fromAPIStockPriceResultToLocalEntity(result: StockPriceResponse, symbol: string): Stock {
        return {
            symbol: symbol,
            currentPrice: result.c,
        };
    }
    static fromAPIStockMarketStatusResultToLocalEntity(result: StockMarketStatusResponse): MarketStatus {
        return {
            market: result.exchange,
            isOpen: result.isOpen,
        };
    }

}
