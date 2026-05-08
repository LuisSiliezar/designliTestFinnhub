import axios from 'axios';

export const mealdbApi = axios.create({
    baseURL: process.env.API_URL ?? 'https://www.themealdb.com/api/json/v1/1/',
    headers: {
        'content-type': 'application/json',
    },
});
