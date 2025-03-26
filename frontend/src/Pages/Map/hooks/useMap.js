import { useState, useEffect } from "react"
import axios from 'axios';

import { useMap as useMapLeaflet, useMapEvents } from 'react-leaflet';

export default function useMap() {
  const [ position, setPosition ] = useState([20.6597586, -103.324082]);
  const [ readableDirection, setReadableDirection ] = useState('');
  const [ displayCard, setDisplayCard ] = useState(0);
  const [ places, setPlaces ] = useState([]);
  const [ home, setHome ] = useState({
    home_name: '',
    home_address: '',
    home_img: '',
    home_description: '',
    home_price: '',
    home_id: '',
    rooms: [],
  });

  const eventHandlers = {
    click: (e) => {
      const { lat, lng } = e.latlng;

      if( lat === position[0] && lng === position[1] ) return;

      (async () => {
        const display_name = await getReadableDirection([lat, lng]);
        const res2 = await axios.get(`http://127.0.0.1:3000/api/home`, { params:{ lat, lon : lng } });

        if ( !display_name || !res2 ) return

        setHome({ ...res2.data.home, home_address: display_name })
      })()
      setDisplayCard(1);
    }
  };

  function showMoreHandler( current ) {
    if ( current !== 2 ) setDisplayCard( current + 1 );
  }

  function showLessHandler( current ) {
    if ( current !== 0 ) setDisplayCard( current - 1 );
  }

  function MapLocator() {
    const map = useMapLeaflet();
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        map.setView([lat, lng], map.getZoom());
        setPosition([lat, lng]);
        setReadableDirection( getReadableDirection([lat, lng]) );
      },
    });
  
    return null;
  }

  function SetViewOnUpdate() {
    const map = useMapLeaflet();
    useEffect(() => {
      // Set the map's view to the new position with zoom level 13
      map.setView(position, 15);
    }, [position, map]);
  
    return null;
  }

  function onPositionUpdate( e ) {
    e.preventDefault();	
    const formData = new FormData(e.target);	
    const readable_location = formData.get('map-form__place');
  
    (async () => {
      const url = `https://nominatim.openstreetmap.org/search`;
      const params = `q=${readable_location}&format=json`;
      const response = await axios.get( `${ url }?${ params }` );

      if ( response?.data[0]?.lat === position[0] && response?.data[1]?.lat === position[1] ) return

      const res = await axios.get( `http://127.0.0.1:3000/api/homes`, {
        params: {
          currentLat: position[0],
          currentLon: position[1],
        }
      });
      if ( response?.data[0]?.lat && response?.data[0]?.lon ) setPosition([response.data[0].lat, response.data[0].lon]);
      if ( response?.data[0]?.display_name ) setReadableDirection(response.data[0].display_name);

      if ( !res || !res.data ) return
      setPlaces(res.data.homes);
    })()
  };

  async function getReadableDirection( position ) {
    const url = `https://nominatim.openstreetmap.org/reverse`;
    const params = `format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`;
    const response = await axios.get( `${ url }?${ params }` );

    if ( response && response.data ) return response.data.display_name;
  }

  // Get current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  // Get readable direction
  useEffect(() => {
    (async () => {
      const readableDirection = await getReadableDirection(position);
      setReadableDirection(readableDirection);
    })()
  }, [ position ]);

  return { 
    position,
    readableDirection,
    home,
    places,
    displayCard,
    SetViewOnUpdate,
    MapLocator,
    onPositionUpdate,
    showMoreHandler,
    showLessHandler,
    eventHandlers,
  };
}
