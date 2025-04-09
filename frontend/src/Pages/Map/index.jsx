import '../../leaflet/leaflet.css';
import styles from './map.module.css';

import Layout from '../Layout';

import MapForm from './Components/MapForm';
import Card from './Components/Card';
import Shadow from './Components/Shadow';
import CustomMap from './Components/CustomMap';

import useCustomMap from './hooks/useMap.js';

import { Marker } from 'react-leaflet'

export default function Map() {
  const { 
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
  } = useCustomMap();
  const inputPlaceholder = 'Ubicación';
  const submitMessage = 'Buscar';

  const occupiedRoomsCount = home?.rooms?.reduce((count, room) => {
    return room.room_ocupied ? count : count + 1;
  }, 0);

  return (
    <Layout>
      <MapForm 
        onSubmit={ onPositionUpdate } 
        inputPlaceholder={ ( typeof( readableDirection ) === 'string' ) ? readableDirection : inputPlaceholder } 
        submitMessage={ submitMessage }
      />
      
      <CustomMap className={ styles[`map`] }	position={ position } MapLocator={ MapLocator } SetViewOnUpdate={ SetViewOnUpdate } >
        { places && places.map((place) => { return (
          <Marker 
            id={ `${ place.ubication[ 0 ] } --- ${ place.ubication[ 1 ] }` }
            key={ `${ place.ubication[ 0 ] } --- ${ place.ubication[ 1 ] }` } 
            position={ place.ubication }
            eventHandlers={ eventHandlers }
            >
          </Marker>
        )})}
      </CustomMap>

      { displayCard ? (
        <>
          <Card 
            title={ home.home_name }
            address={ home.home_address }
            roomsNumber={ occupiedRoomsCount }
            showingState={ displayCard } 
            tags={ home.tags }
            rooms={ home.rooms }
            onSale={ home.home_all_in }
            showLessHandler={ () => showLessHandler( displayCard ) } 
            showMoreHandler={ () => showMoreHandler( displayCard ) }
          />
          <Shadow />
        </>) : null }
    </Layout>
  )
}
