import { AxiosAdapter } from './http';

export const stocksAPIFetcher = new AxiosAdapter({
    baseURL: 'https://finnhub.io/api/v1/',
    params: {
        exchange: 'US',
        token: `${process.env.API_KEY}`,
    },
});
