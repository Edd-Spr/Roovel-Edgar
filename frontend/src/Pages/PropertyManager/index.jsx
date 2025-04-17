
import './PropertyManager.module.css';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import { useState } from 'react';

const PropertyManager = () => {

  const [houseEditorIsOpen, setHouseEditorIsOpen] = useState(true);
  const [roomEditorIsOpen, setRoomEditorIsOpen] = useState(true);
  return (
    <Layout>
      {houseEditorIsOpen && <HouseEditor setRoomEditorIsOpen={setRoomEditorIsOpen}/>}
      {roomEditorIsOpen && <RoomEditor setRoomEditorIsOpen={setRoomEditorIsOpen}/>}
    </Layout>
  )
}
export default PropertyManager;