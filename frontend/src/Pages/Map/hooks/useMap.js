import { useState, useEffect } from "react"
import axios from 'axios';

import { API_URL_MAP__NEAREST_PLACES, API_URL_MAP__HOME } from "../../../env";

import { useMap as useMapLeaflet, useMapEvents } from 'react-leaflet';

export default function useMap() {
  const [ position, setPosition ] = useState([20.6597586, -103.324082]);
  const [ readableDirection, setReadableDirection ] = useState('');
  const [ displayCard, setDisplayCard ] = useState(0);
  const [ places, setPlaces ] = useState([]);
  const [ home, setHome ] = useState({});
  const [ searched, setSearched ] = useState(false);

  const [ dirTyped, setDirTyped ] = useState('');
  const [ possiblePlaces, setPossiblePlaces ] = useState([]);

  async function getNearestPlaces({ params }) {
    if ( !params ) return
    return await axios.get( API_URL_MAP__NEAREST_PLACES, { params } );
  }

  async function getPlace({ params }) {
    if ( !params ) return
    return await axios.get( API_URL_MAP__HOME, { params } );
  }

  async function getReadableDirection( position ) {
    const url = `https://nominatim.openstreetmap.org/reverse`;
    const params = `format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`;
    const response = await axios.get( `${ url }?${ params }` );

    if ( response && response.data ) return response.data.display_name;
  }

  async function getSimilarPlaces( readable_location ) {
    const url = `https://nominatim.openstreetmap.org/search`;
    const params = `q=${readable_location}&format=json&addressdetails=1`;
    const response = await axios.get( `${ url }?${ params }` );

    if ( response && response.data ) return response.data;
  }

  async function getLatLng( readable_location ) {
    const url = `https://nominatim.openstreetmap.org/search`;
    const params = `q=${readable_location}&format=json`;
    const response = await axios.get( `${ url }?${ params }` );

    if ( response && response.data[ 0 ] ) return [ response.data[ 0 ].lat, response.data[ 0 ].lon, response.data[ 0 ].display_name ];
  }

  async function getPlaces( latlng ) {
    // If the response is empty, do nothing
    // Should give feedback to the user
    if ( !latlng ) return
    const [ lat, lng ] = latlng;

    // Get nearest places
    const res = await getNearestPlaces( { params: { currentLat: lat, currentLon: lng } });

    // it the places response is empty, do nothing
    if ( !res || !res.data ) return
    setPlaces( res.data.homes ); // instead, update
  }

  const eventHandlers = {
    click: (e) => {
      const { lat, lng } = e.latlng;

      if( lat === position[0] && lng === position[1] ) return;

      (async () => {
        const display_name = await getReadableDirection([lat, lng]);
        const res2 = await getPlace({ params:{ lat, lon: lng } });

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
        setReadableDirection( readableDirection );
      },
    });
  
    return null;
  }

  function SetViewOnUpdate() {
    const map = useMapLeaflet();
    useEffect(() => {
      // Set the map's view to the new position with zoom level 13
      if ( !position ) return
      map.setView(position, 15);
    }, [position, map]);
  
    return null;
  }

  function onPositionUpdate( e ) {
    const userDirectionTyped = e.target.value;
    setSearched(false);
    setDirTyped( userDirectionTyped );
  };

  function onOptionSelected( e ) {
    const selectedOption = e.target.textContent;

    const { ubication } = possiblePlaces.find( place => place.display_name === selectedOption );
    if ( !ubication ) return

    setPosition( ubication );//So the map can be updated
    setReadableDirection( selectedOption );

    setDirTyped( selectedOption );//Update the input value
    getPlaces( ubication );//Look for the nearest places
    setPossiblePlaces([]);//Clean the options, so the user can see the map
    setSearched(true);
  }

  function cleanPlaces( places ) {
    return places.map( place => {
      return {
        ubication: [ place.lat, place.lon ],
        display_name: place.display_name,
      }
    })
  }

  function onSubmit( e ) {
    e.preventDefault();
    
    getPlaces( position );
    setSearched(true);
  }

  useEffect(() => {
    if ( dirTyped ) {
      const timeout = setTimeout(async () => {
        const res = await getSimilarPlaces(dirTyped)
        if ( !res ) return

        if ( res.length > 0 ) {
          setPossiblePlaces( cleanPlaces( res ) );
        }

      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [ dirTyped ]);

  // Get current position
  useEffect(() => {
    // This start to botter me, so I will comment it out for now
    // at the end, we'll focus on CUCEI location for now

    // navigator.geolocation.getCurrentPosition((position) => {
    //   setPosition([position.coords.latitude, position.coords.longitude]);
    // });
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
    dirTyped,
    possiblePlaces,
    searched,
    SetViewOnUpdate,
    MapLocator,
    onPositionUpdate,
    onOptionSelected,
    onSubmit,
    getPlaces,
    showMoreHandler,
    showLessHandler,
    eventHandlers,
  };
}
