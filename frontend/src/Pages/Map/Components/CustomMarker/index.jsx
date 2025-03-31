import L from "leaflet"
import { Marker } from "react-leaflet"
import markerIcon from '../../../../../public/Graphics/Icons/marker-svgrepo.svg'

export default function CustomMarker({ position, eventHandlers, children }) {
	const customIcon = new L.Icon({
		iconUrl: markerIcon,
		iconSize: [ 45, 45 ], // size of the icon
		iconAnchor: [ 20, 40 ], // point of the icon which will correspond to marker's location
		popupAnchor: [ 0, -40 ], // point from which the popup should open relative to the iconAnchor
	})

	return (
		<Marker 
			icon={ customIcon }
			position={ position } 
			eventHandlers={ eventHandlers } 
			>{ children }</Marker>
	)
}
