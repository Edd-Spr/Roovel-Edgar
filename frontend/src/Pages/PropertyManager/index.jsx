import Styles from './PropertyManager.module.css';
import { useState } from 'react';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import PropertyOverview from '../../Components/PropertyOverview';
import RoomOverview from '../../Components/RoomOverview';
import DashboardSidebar from './Components/DashboardSidebar';
import PropertyManagerPanel from './Components/PropertyManagerPanel';

const PropertyManager = () => {
  const [isHouseEditorOpen, setIsHouseEditorOpen] = useState(false);
  const [isRoomEditorOpen, setIsRoomEditorOpen] = useState(false);
  const [isPropertyOverviewOpen, setIsPropertyOverviewOpen] = useState(false);
  const [isRoomOverviewOpen, setIsRoomOverviewOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
        { id_tag: 1, tag_content: 'Ecológico' },
        { id_tag: 2, tag_content: 'Sustentable' },
        { id_tag: 3, tag_content: 'Ahorro' },
        { id_tag: 4, tag_content: 'Decoración' },
        { id_tag: 5, tag_content: 'Minimalismo' },
        { id_tag: 5, tag_content: 'Minimalismo' }
      ],
      mainImage: [{ id_image: 1, image_content: '/PropertyImages/111-house.jpeg' }],
      images: [
        { id_image: 2, image_content: '/PropertyImages/112-house.jpeg' },
        { id_image: 3, image_content: '/PropertyImages/113-house.jpeg' },
        { id_image: 4, image_content: '/PropertyImages/114-house.jpeg' },
      ]
    },
    {
      id_home: 2,
      home_owner: 2,
      home_name: 'Loft Roma Norte',
      home_on_sale: 0,
      home_all_in: 1,
      home_description: 'Loft moderno con excelente iluminación natural.',
      address: 'Av. Álvaro Obregón 85, CDMX',
      home_ubication: [19.4174, -99.1626],
      tags: [
        { id_tag: 1, tag_content: 'Moderno' },
        { id_tag: 3, tag_content: 'Ahorro' },
        { id_tag: 6, tag_content: 'Conectado' }
      ],
      mainImage: [{ id_image: 1, image_content: '/PropertyImages/121-house.jpeg' }],
      images: [
        { id_image: 2, image_content: '/PropertyImages/122-house.jpg' },
        { id_image: 3, image_content: '/PropertyImages/123-house.jpeg' },
        { id_image: 4, image_content: '/PropertyImages/124-house.jpeg' },
        { id_image: 4, image_content: '/PropertyImages/125-house.jpg' },
      ]
    },
    {
      id_home: 3,
      home_owner: 3,
      home_name: 'Departamento Vista al Parque',
      home_on_sale: 1,
      home_all_in: 1,
      home_description: 'Espacio cómodo con vista privilegiada al parque central.',
      address: 'Calle del Parque 456, Guadalajara',
      home_ubication: [20.6765, -103.3476],
      tags: [
        { id_tag: 2, tag_content: 'Sustentable' },
        { id_tag: 4, tag_content: 'Decoración' },
        { id_tag: 7, tag_content: 'Pet Friendly' }
      ],
      mainImage: [{ id_image: 1, image_content: '/PropertyImages/121-room.jpeg' }],
      images: [
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
              image_content: '/PropertyImages/121-room.jpeg'
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
  },
  {
      id_room: 3,
      id_home: 2,
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
              image_content: '/PropertyImages/221-room.avif'
          }
      ],
      images: [
          {
              id_image: 11,
              image_content: '/PropertyImages/222-room.jpeg',
              image_content: '/PropertyImages/223-room.jpeg',
          }
      ]
  }

  ]);


  const handlePropertyCardClick = (property) => {
    setSelectedProperty(property);
    setIsPropertyOverviewOpen(true);
  };

  return (
    <Layout>

      <article className={Styles['property-manager__container']}>
        <DashboardSidebar
          pendingRooms={pendingRooms}
        />
        <PropertyManagerPanel 
          propertys={propertys} 
          setPropertys={setPropertys} 
          setIsHouseEditorOpen={setIsHouseEditorOpen} 
          onPropertyCardClick={handlePropertyCardClick} 
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
          setSelectedRoom={setSelectedRoom}
          setIsRoomOverviewOpen={setIsRoomOverviewOpen}
          openHouseEditor={(house) => {
            setSelectedHouse(house.id_home || null);
            setIsHouseEditorOpen(true);
          }}
          setSelectedHouse={setSelectedHouse}
        />
      </article>



      {isHouseEditorOpen && (
        <HouseEditor
          property={propertys.find(prop => prop.id_home === selectedHouse)}
          closeModal={() => setIsHouseEditorOpen(false)}
          openRoomEditor={(room) => {
            setSelectedRoom(room || null);
            setIsRoomEditorOpen(true);
          }}
          closeHouseEditor={() => setIsHouseEditorOpen(false)}
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
          setIsPropertyOverviewOpen={setIsPropertyOverviewOpen}
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
          property_name={selectedProperty.home_name}
          property_description={selectedProperty.home_description}
          property_address={selectedProperty.address}
          property_tags={selectedProperty.tags}
          property_images={selectedProperty.images}
          property_main_image={selectedProperty.mainImage}
          property_owner={selectedProperty.home_owner}
          property_id_home={selectedProperty.id_home}
          
          rooms={pendingRooms.filter((room) => room.id_home === selectedProperty.id_home)} 
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

  );
};





export default PropertyManager;