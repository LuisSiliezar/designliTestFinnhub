import axios from 'axios';

export const finnhubApi = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'content-type': 'application/json',
    },
});
