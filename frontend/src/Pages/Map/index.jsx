import '../../leaflet/leaflet.css';
import styles from './map.module.css';

import Layout from '../Layout';

import MapForm from './Components/MapForm';
import Card from './Components/Card';
import Shadow from './Components/Shadow';
import CustomMap from './Components/CustomMap';

import useCustomMap from './hooks/useMap.js';

import { Marker } from 'react-leaflet'
import { latLng } from 'leaflet';

export default function Map() {
  const { 
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
    showMoreHandler, 
    showLessHandler,
    eventHandlers,
  } = useCustomMap();
  const inputPlaceholder = 'Ubicación';
  const submitMessage = 'Buscar';

  const occupiedRoomsCount = home?.rooms?.reduce((count, room) => {
    return room.room_ocupied ? count : count + 1;
  }, 0);

  return (
    <Layout>
      <MapForm 
        onSubmit={ onSubmit } 
        searchBarValue={ dirTyped }
        onSearchBarUpdate={ onPositionUpdate }
        options={ possiblePlaces }
        alreadySelected={ searched }
        onOptionSelected={ onOptionSelected }
        inputPlaceholder={ ( typeof( readableDirection ) === 'string' ) ? readableDirection : inputPlaceholder } 
        submitMessage={ submitMessage }
      />
      
      <CustomMap className={ styles[`map`] }	position={ position } MapLocator={ MapLocator } SetViewOnUpdate={ SetViewOnUpdate } >
        { places && places.map((place) => { 
          return (
          <Marker 
            id={ `${ place.home_ubication[ 0 ] } --- ${ place.home_ubication[ 1 ] }` }
            key={ `${ place.home_ubication[ 0 ] } --- ${ place.home_ubication[ 1 ] }` } 
            position={ latLng( place.home_ubication ) }
            eventHandlers={ eventHandlers }
            >
          </Marker>
        )})}
      </CustomMap>

      { displayCard ? (
        <>
          <Card 
            { ...home }
            roomsNumber={ occupiedRoomsCount }
            showingState={ displayCard }
            showLessHandler={ () => showLessHandler( displayCard ) } 
            showMoreHandler={ () => showMoreHandler( displayCard ) }
          />
          <Shadow />
        </>) : null }
    </Layout>
  )
}
