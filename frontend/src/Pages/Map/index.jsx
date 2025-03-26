import '../../leaflet/leaflet.css';
import styles from './map.module.css';

import Layout from '../Layout/index.jsx';

import MapForm from './Components/MapForm/index.jsx';
import Card from './Components/Card/index.jsx';
import Shadow from './Components/Shadow/index.jsx';

import useCustomMap from './hooks/useMap.js';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Index() {
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

  return (
    <Layout>
      <MapForm 
        onSubmit={ onPositionUpdate } 
        inputPlaceholder={ ( typeof( readableDirection ) === 'string' ) ? readableDirection : inputPlaceholder } 
        submitMessage={ submitMessage }
      />
      <MapContainer 
        className={ styles[`map`] }	
        center={ position } 
        zoom={15} 
        scrollWheelZoom={false}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker eventHandlers={ eventHandlers } position={ position }>
          <Popup>
            { readableDirection }
          </Popup>
        </Marker>

        { places && places.map((place) => { return (
          <Marker 
            id={ `${ place.ubication[ 0 ] } --- ${ place.ubication[ 1 ] }` }
            key={ `${ place.ubication[ 0 ] } --- ${ place.ubication[ 1 ] }` } 
            position={ place.ubication }
            eventHandlers={ eventHandlers }
            >
          </Marker>
        )})}

        <SetViewOnUpdate position={ position } /> {/* This will update the map center */}
        <MapLocator /> {/* This will allow the user to click on the map */}
      </MapContainer>
      { displayCard ? (
        <>
          <Card 
            title={ home.home_name }
            address={ home.home_address }
            roomsNumber={ 6 }
            showingState={ displayCard } 
            tags={ ['tag1', 'tag2', 'tag3'] }
            rooms={ [ 'room1', 'room2', 'room3' ] }
            showLessHandler={ () => showLessHandler( displayCard ) } 
            showMoreHandler={ () => showMoreHandler( displayCard ) }
          />
          <Shadow />
        </>) : null }
    </Layout>
  )
}
