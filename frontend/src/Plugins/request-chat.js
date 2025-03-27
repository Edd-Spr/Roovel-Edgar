import axios from 'axios';

export const httpClientePlugin = {
    get: async(url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
    post: async(url, body) => {
        try {
            const response = await axios.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    },
    put: async(url, body) => {
        return new Error('This part code isnt implement');
    },
    delete: async(url, body) => {
        return new Error('This part code isnt implement');
    }
};