import '../../../../leaflet/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'
import CustomMarker from '../CustomMarker';

export default function CustomMap({ className, position, readableDirection, eventHandlers, SetViewOnUpdate, MapLocator, children }) {
  return (
    <MapContainer 
      className={ className }	
      center={ position } 
      zoom={15} 
      scrollWheelZoom={ true }
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker eventHandlers={ eventHandlers } position={ position } popUpText={ readableDirection }/>

      { children }

      <SetViewOnUpdate position={ position } /> {/* This will update the map center */}
      <MapLocator /> {/* This will allow the user to click on the map */}
    </MapContainer>
  )
}
