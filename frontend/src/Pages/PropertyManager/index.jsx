import './PropertyManager.module.css';
import { useState } from 'react';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import PropertyOverview from '../../Components/PropertyOverview';

const PropertyManager = () => {
  const [isHouseEditorOpen, setIsHouseEditorOpen] = useState(true);
  const [isRoomEditorOpen, setIsRoomEditorOpen] = useState(false);
  const [isPropertyOverviewOpen, setIsPropertyOverviewOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const [propertys, setPropertys] = useState([
    {
      id_home: 1,
      home_owner: 1,
      home_name: 'Casa Chapultepec',
      home_on_sale: 1,
      home_all_in: 0,
      home_description: 'Casa amplia en zona céntrica, ideal para estudiantes.',
      address: 'Calle Falsa 123, Ciudad de México',
      home_ubication: [20.6736, -103.3440],
      tags: [
          {
              id_tag: 1,
              tag_content: 'Ecológico'
          },
          {
              id_tag: 2,
              tag_content: 'Sustentable'
          },
          {
              id_tag: 3,
              tag_content: 'Ahorro'
          },
          {
              id_tag: 4,
              tag_content: 'Decoración'
          },
          {
              id_tag: 5,
              tag_content: 'Minimalismo'
          }
      ],
      mainImage: [
          {
              id_image: 1,
              image_content: '/PropertyImages/121-room.jpeg'
          }
      ],
      images: [
          {
              id_image: 2,
              image_content: '/PropertyImages/122-room.jpeg',
          },
          {
              id_image: 3,
              image_content: '/PropertyImages/123-room.jpeg',
          },
          {
              id_image: 4,
              image_content: '/PropertyImages/221-room.jpeg',
          },
          {
              id_image: 5,
              image_content: '/PropertyImages/221-room.jpeg',
          },
          {
              id_image: 6,
              image_content: '/PropertyImages/221-room.jpeg',
          },
          {
              id_image: 7,
              image_content: '/PropertyImages/221-room.jpeg',
          }
      ]
  }
]);

const [pendingRooms, setPendingRooms] = useState([
  {
    id_room: 1,
    id_home: 1,
    room_ocupied: 0,
    room_price: 4500,
    romm_description: 'Habitación con luz natural y clóset amplio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 6,
            tag_content: 'Moderno'
        },
        {
            id_tag: 7,
            tag_content: 'Luz natural'
        },
        {
            id_tag: 8,
            tag_content: 'Espacioso'
        }
    ],
    mainImage: [
        {
            id_image: 6,
            image_content: '/PropertyImages/122-room.jpeg'
        }
    ],
    images: [
        {
            id_image: 7,
            image_content: '/PropertyImages/123-room.jpeg'
        }
    ]
},
{
    id_room: 2,
    id_home: 1,
    room_ocupied: 1,
    room_price: 4700,
    romm_description: 'Cuarto amueblado con cama individual y escritorio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 9,
            tag_content: 'Minimalista'
        },
        {
            id_tag: 10,
            tag_content: 'Vista al jardín'
        },
        {
            id_tag: 11,
            tag_content: 'Silenciosa'
        }
    ],
    mainImage: [
        {
            id_image: 8,
            image_content: '/PropertyImages/123-room.jpeg'
        }
    ],
    images: [
        {
            id_image: 9,
            image_content: '/PropertyImages/122-room.jpeg'
        }
    ]
},
{
    id_room: 3,
    id_home: 1,
    room_ocupied: 0,
    room_price: 4300,
    romm_description: 'Habitación con baño compartido y vista al patio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 12,
            tag_content: 'Estilo rústico'
        },
        {
            id_tag: 13,
            tag_content: 'Techo alto'
        },
        {
            id_tag: 14,
            tag_content: 'Amueblada'
        }
    ],
    mainImage: [
        {
            id_image: 10,
            image_content: '/PropertyImages/122-room.jpeg'
        }
    ],
    images: [
        {
            id_image: 11,
            image_content: '/PropertyImages/123-room.jpeg'
        }
    ]
}

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


      {isPropertyOverviewOpen && (
        <PropertyOverview
          property={propertys[0]}
          rooms={pendingRooms}
          closePropertyOverview={() => setIsPropertyOverviewOpen(false)}
        />
      )}
    </Layout>

  );
};

export default PropertyManager;