import '../../leaflet/leaflet.css';
import styles from './map.module.css';

import Layout from '../Layout';

import MapForm from './Components/MapForm';
import Card from './Components/Card';
import Shadow from './Components/Shadow';
import CustomMap from './Components/CustomMap';
import PropertyOverview from '../../Components/PropertyOverview';
import RoomOverview from '../../Components/RoomOverview';

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
    isPropertyOverviewOpen,
    isRoomOverviewOpen,
    selectedRoom,
    selectedProperty,
    SetViewOnUpdate, 
    MapLocator,
    onPositionUpdate,
    onOptionSelected,
    onSubmit,
    showMoreHandler, 
    showLessHandler,
    setIsPropertyOverviewOpen,
    setIsRoomOverviewOpen,
    setSelectedRoom,
    setSelectedProperty,
    eventHandlers,
  } = useCustomMap();
  const inputPlaceholder = 'Ubicación';
  const submitMessage = 'Buscar';

  const occupiedRoomsCount = home?.rooms?.reduce((count, room) => {
    return room.room_ocupied ? count : count + 1;
  }, 0);

  console.log( 'imagenes - - - - - - - ', home.imgs )
  return (
    <Layout height='92vh'>
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
          console.log( place) 
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
            setIsPropertyOverviewOpen={ setIsPropertyOverviewOpen }
          />
          <Shadow showLessHandler={ () => showLessHandler( displayCard ) } />
        </>) : null }

        {isPropertyOverviewOpen && (
        <PropertyOverview
          property_name={home.home_name}
          property_description={home.home_description}
          property_address={home.address}
          property_tags={home.tags}
          property_images={home.imgs.filter((img, i) => i > 0)}
          property_main_image={home.imgs[0]}
          property_owner={home.home_owner}
          property_id_home={home.id_home}
          
          rooms={home.rooms} 
          closePropertyOverview={() => setIsPropertyOverviewOpen(false)}
          OpenRoomOverview={()=> setIsRoomOverviewOpen(true)}
          setSelectedRoom={setSelectedRoom}
        />
      )}
      {isRoomOverviewOpen && (
        <RoomOverview
          room={selectedRoom}
          room_name={selectedRoom.home_name}
          room_description={selectedRoom.romm_description}
          room_price={selectedRoom.room_price}
          room_tags={selectedRoom.tags}
          room_images={selectedRoom.images}
          room_main_image={selectedRoom.mainImage}
          property={propertys.find( prop => prop.id_home === selectedRoom.id_home )}
          
          setSelectedProperty={setSelectedProperty}
          closeRoomOverviewOpen={()=>setIsRoomOverviewOpen(false)}
          setIsPropertyOverviewOpen={() => setIsPropertyOverviewOpen(true)}
        />
      )}
    </Layout>
  )
}
