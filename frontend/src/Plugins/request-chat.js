import axios from 'axios';

export const httpClientePlugin = {
    get: async(url) => {
        const { data } = await axios.get(url);
        return data;
    },
    post: async(url, body) => {
        return new Error('This part code isnt implement');
    },
    put: async(url, body) => {
        return new Error('This part code isnt implement');
    },
    delete: async(url, body) => {
        return new Error('This part code isnt implement');
    }
};