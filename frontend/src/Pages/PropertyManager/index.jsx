import Styles from './PropertyManager.module.css';
import { useState } from 'react';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import PropertyOverview from '../../Components/PropertyOverview';
import RoomOverview from '../../Components/RoomOverview';
import DashboardSidebar from './Components/DashboardSidebar';
import PropertyManagerPanel from './Components/PropertyManagerPanel';

import { DUMMY_PROPERTIES, DUMMY_PENDING_ROOMS } from './dummies.js';

export default function PropertyManager() {
  const [isHouseEditorOpen, setIsHouseEditorOpen] = useState(false);
  const [isRoomEditorOpen, setIsRoomEditorOpen] = useState(false);
  const [isPropertyOverviewOpen, setIsPropertyOverviewOpen] = useState(false);
  const [isRoomOverviewOpen, setIsRoomOverviewOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [properties, setPropertys] = useState( DUMMY_PROPERTIES );
  const [pendingRooms, setPendingRooms] = useState( DUMMY_PENDING_ROOMS );

  // TODO: Editing house

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
          propertys={properties} 
          setPropertys={setPropertys} 
          setIsHouseEditorOpen={setIsHouseEditorOpen} 
          onPropertyCardClick={handlePropertyCardClick} 
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
          setSelectedRoom={setSelectedRoom}
          setIsRoomOverviewOpen={setIsRoomOverviewOpen}
          openHouseEditor={(house) => {
            setSelectedHouseId(house.id_home || null);
            setIsHouseEditorOpen(true);
          }}
          setSelectedHouse={setSelectedHouseId}
        />
      </article>

      {isHouseEditorOpen && (
        <HouseEditor
          property={ properties.find(prop => prop.id_home === selectedHouseId) }
          closeModal={() => setIsHouseEditorOpen(false)}
          openRoomEditor={(room) => {
            setSelectedRoom(room || null);
            setIsRoomEditorOpen(true);
          }}
          closeHouseEditor={() => setIsHouseEditorOpen(false)}
          pendingRooms={ pendingRooms.filter((room) => room.id_home === selectedHouseId) }
          setPendingRooms={setPendingRooms}
          setIsPropertyOverviewOpen={setIsPropertyOverviewOpen}
        />
      )}

      {isRoomEditorOpen && (
        <RoomEditor
          room={selectedRoom}
          closeModal={() => setIsRoomEditorOpen(false) }
          house={selectedHouseId} 
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
        />
      )}

      {isPropertyOverviewOpen && (
        <PropertyOverview
          property={selectedProperty}
          rooms={pendingRooms.filter((room) => room.id_home === selectedProperty.id_home)} 
          closePropertyOverview={() => setIsPropertyOverviewOpen(false)}
          OpenRoomOverview={()=> setIsRoomOverviewOpen(true)}
          setSelectedRoom={setSelectedRoom}
        />
      )}
      
      {isRoomOverviewOpen && (
        <RoomOverview
          room={selectedRoom}
          property={properties.find( prop => prop.id_home === selectedRoom.id_home )}
          setSelectedProperty={setSelectedProperty}
          closeRoomOverviewOpen={()=>setIsRoomOverviewOpen(false)}
          setIsPropertyOverviewOpen={() => setIsPropertyOverviewOpen(true)}
        />
      )}
    </Layout>
  );
};