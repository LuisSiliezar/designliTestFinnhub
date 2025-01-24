import { AxiosAdapter } from './http';

export const stocksAPIFetcher = (symbol: string = '') => {
    return new AxiosAdapter({
        baseURL: 'https://finnhub.io/api/v1/',
        params: {
            exchange: 'US',
            symbol: symbol ?? '',
            token: `${process.env.API_KEY}`,
        },
    });
};
