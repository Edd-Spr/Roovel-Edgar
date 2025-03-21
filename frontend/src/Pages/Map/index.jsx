import '../../leaflet/leaflet.css';

import { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function SetViewOnUpdate({ position }) {
  const map = useMap();
  useEffect(() => {
    // Set the map's view to the new position with zoom level 13
    map.setView(position, 13);
  }, [position, map]);

  return null;
}

export default function Index() {
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={ position } zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={ position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetViewOnUpdate position={position} /> {/* This will update the map center */}
      </MapContainer>
    </div>
  )
}
