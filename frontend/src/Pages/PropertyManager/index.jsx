import './PropertyManager.module.css';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import { useState } from 'react';

const PropertyManager = () => {
  const [isHouseEditorOpen, setIsHouseEditorOpen] = useState(true);
  const [isRoomEditorOpen, setIsRoomEditorOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const [pendingRooms, setPendingRooms] = useState([
    {
        id_room: 1,
        id_house: 1,
        id_owner: 1,
        name: 'Habitación Principal',
        price: 100,
        description: 'Habitación principal con cama king size y baño privado.',
        tags: ['Habitación', 'Principal'],
        mainImage: '/PropertyImages/121-room.jpeg',
        images: [
            '/PropertyImages/122-room.jpeg',
            '/PropertyImages/123-room.jpeg',
        ],
    },
    {
        id_room: 2,
        id_house: 1,
        id_owner: 1,
        name: 'Habitación Secundaria',
        price: 100,
        description: 'Habitación secundaria con cama queen size y baño compartido.',
        tags: ['Habitación', 'Secundaria'],
        mainImage: '/PropertyImages/221-room.jpeg',
        images: [],
    },
]);


  return (
    <Layout>
      {isHouseEditorOpen && (
        <HouseEditor
          closeModal={() => setIsHouseEditorOpen(false)}
          openRoomEditor={(room) => {
            setSelectedRoom(room || null);
            setIsRoomEditorOpen(true);
          }}
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
        />
      )}

      {isRoomEditorOpen && (
        <RoomEditor
          room={selectedRoom}
          closeModal={() => setIsRoomEditorOpen(false) }
          house={selectedHouse} 
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
        />
      )}
    </Layout>
  );
};

export default PropertyManager;