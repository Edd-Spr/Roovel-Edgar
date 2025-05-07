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
    post: async( idSentMessage,idReciveMessague, message) => {
        try {
            const response = await fetch('http://localhost:3000/api/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idReciveMessague,
                idSentMessage,
                message,
              }),
            });
        
            if (!response.ok) {
              throw new Error('Error al enviar el mensaje');
            }
        
            const data = await response.json();
            console.log('Mensaje enviado:', data);
            return data;
          } catch (error) {
            console.error('Error al enviar el mensaje:', error);
          }
    },
    put: async(url, body) => {
        return new Error('This part code isnt implement');
    },
    delete: async(url, body) => {
        return new Error('This part code isnt implement');
    }
};
export const ClientPlugin_perfiles_chat = {
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
    return new Error('This part code isnt implement');
  },
  put: async(url, body) => {
    return new Error('This part code isnt implement');
  },
  delete: async(url, body) => { 
    return new Error('This part code isnt implement');
  }
};
export const ClientPlugin_group_chat = {
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
    return new Error('This part code isnt implement');
  },
  put: async(url, body) => {
    return new Error('This part code isnt implement');
  },
  delete: async(url, body) => { 
    return new Error('This part code isnt implement');
  }
};
export const ClientPligin_friends = {
  get : async(url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
      
    }
  },
  post: async (url, body) => {

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        console.log('url', url);
        console.log('body', body);
        throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
},
  put: async(url, body) => {
    return new Error('This part code isnt implement');
  },  
  delete: async(url, body) => { 
    return new Error('This part code isnt implement');
  }
}
