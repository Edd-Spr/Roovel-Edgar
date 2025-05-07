import { apiRequest } from './api.js';
export { apiRequest }

export function fromURLtoB64( url ) {
  const fetchAndConvert = async () => {
    const response = await fetch( url );
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL( blob );

    return new Promise( ( resolve ) => {
      reader.onloadend = () => {
        resolve( reader.result );
      };
      reader.onerror = ( error ) => {
        console.error( 'Error converting URL to base64:', error );
        resolve( null );
      }
    });
  }

  return fetchAndConvert()
}