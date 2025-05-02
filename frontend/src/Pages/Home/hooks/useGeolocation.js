import axios from 'axios';

export async function getReadableDirection(position) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse`;
        const params = `format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`;
        const response = await axios.get(`${url}?${params}`);

        if (response && response.data) {
            return response.data.display_name;
        } else {
            console.warn('Respuesta inesperada:', response);
            return 'Dirección no disponible';
        }
    } catch (error) {
        console.error('Error en getReadableDirection:', error);
        return 'Error al obtener dirección';
    }
}


export async function getSimilarPlaces(readable_location) {
    const url = `https://nominatim.openstreetmap.org/search`;
    const params = `q=${readable_location}&format=json&addressdetails=1`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data) return response.data;
    return [];
}