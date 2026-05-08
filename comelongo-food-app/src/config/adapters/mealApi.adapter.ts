import { AxiosAdapter } from './http';

export const mealApiFetcher = () => {
    return new AxiosAdapter({
        baseURL: process.env.API_URL ?? 'https://www.themealdb.com/api/json/v1/1/',
    });
};
