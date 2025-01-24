import type { Stock } from '@domain/entities';
import type { StockResponse } from '@infrastructure/interfaces';

export class StocksMapper {
    static fromAPIStocksResultToLocalEntity(result: StockResponse): Stock {
        return {
            symbol: result.symbol,
            name: result.description,
        };
    }
}
