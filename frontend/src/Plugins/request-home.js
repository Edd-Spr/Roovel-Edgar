import axios from "axios";

export const ClientPlugin_request_home = {
    get: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
};
export const ClientPlugin_request_roomAll = {
    get: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
}
