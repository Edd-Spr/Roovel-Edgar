import Styles from './PropertyManager.module.css';
import { useEffect, useState } from 'react';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import PropertyOverview from '../../Components/PropertyOverview';
import RoomOverview from '../../Components/RoomOverview';
import DashboardSidebar from './Components/DashboardSidebar';
import PropertyManagerPanel from './Components/PropertyManagerPanel';

import AuthLoader from '../Authentication/Components/AuthLoader/index.jsx';
import swal from 'sweetalert2';
import { useAuth } from '../../hooks/auth';

import useMainImages from './hooks/useMainImages';
import useInfoProperty from './hooks/useInfoProperty';

import { apiRequest } from '../../utils/api.js';
import { API_URL_HOUSE, API_URL_ROOM } from '../../env.js';

import { DUMMY_PROPERTIES, DUMMY_PENDING_ROOMS } from './dummies.js';
// import Index from '../Map/Components/MapForm/index.jsx';

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

  // property in json format
  // already created
  const [createdProperty, setCreatedProperty] = useState();
  // rooms already created
  const [createdRooms, setCreatedRooms] = useState();

  const [createdPropertyId, setCreatedPropertyId] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const { redirectBasedOnRole } = useAuth();

  // image hook for room creation
  const {
    images,
    mainImage,
    fileInputRef,
    errorMessage,
    handleImageClick,
    handleMainFileChange,
    handleImageChange,
    handleCropComplete,
    handleCancelCrop,
    handleDeleteImage,
    croppingImage,
    setCroppedMainImage,
    isModalOpen,
    setIsModalOpen,
    imageFile,
    setImageFile,
    originalFile,
    setOriginalFile,
    resetHook: resetMainImages
  } = useMainImages();

  // property info hook
  // location for rooms not needed
  const { 
    propertyName, 
    propertyType, 
    propertyPrice,
    propertyDescription, 
    propertyTags, 
    handlePropertyNameChange, 
    handlePropertyTypeChange, 
    handlePropertyPriceChange, 
    handlePropertyDescriptionChange, 
    handleTagsChange,
    resetHook: resetInfoProperty
  } = useInfoProperty({ price: createdProperty?.price, tags: createdProperty?.tags });

  const firstStepRoomValues = {
    images,
    mainImage,
    fileInputRef,
    errorMessage,
    croppingImage,
    isModalOpen,
    imageFile,
    originalFile
  }

  const firstStepRoomHandlers = {
    handleImageClick,
    handleMainFileChange,
    handleImageChange,
    handleCropComplete,
    handleCancelCrop,
    handleDeleteImage,
    setCroppedMainImage,
    setIsModalOpen,
    setImageFile,
    setOriginalFile
  }

  const secondStepRoomValues = {
    propertyName,
    propertyType,
    // set house price as default when creating a room
    // if the user modifies the price, it will be updated accordingly
    propertyPrice: propertyPrice,
    propertyDescription,
    propertyTags
  }

  const secondStepRoomHandlers = {
    handlePropertyNameChange,
    handlePropertyTypeChange,
    handlePropertyPriceChange,
    handlePropertyDescriptionChange,
    handleTagsChange
  }

  // TODO: Editing house

  const handlePropertyCardClick = (property) => {
    setSelectedProperty(property);
    setIsPropertyOverviewOpen(true);
  };

  function handleSaveProperty( jsonProperty ) {
    // const newProperty = JSON.parse(jsonProperty);
    setCreatedProperty( jsonProperty );
  }

  function handleSaveRoom() {
    const newRoom = roomToJson();// creates the room from the hook's state
    // clean hooks
    resetMainImages();
    resetInfoProperty();

    // update the list of rooms
    if ( createdRooms ) {
      setCreatedRooms( [ ...createdRooms, newRoom ] );
    }
    else {
      setCreatedRooms( [ newRoom ] );
    }
  }

  function roomToJson() {
    return {
      name: propertyName,
      images: [ mainImage, ...images ],
      price: propertyPrice,
      description: propertyDescription,
      tags: propertyTags
    }
  }

  function handleDeleteRoom( roomId ) {
    const updatedRooms = createdRooms.filter( (room, index) => { if ( index !== roomId ) return room } )
    setCreatedRooms( updatedRooms );
  }

  async function submitProperty() {
    setLoading(true);
    try {
      const propertyRes = await saveProperty();
      console.log( 'Property response:', propertyRes );
      if ( propertyRes.data.insertId ) {
        const insertedId = propertyRes.data.insertId;
        setCreatedPropertyId( insertedId );
        
        const roomPromises = createdRooms?.map( async (room) =>
          saveRoom( { ...room, id_home: propertyRes.data.insertId } )
        )
        
        const results = await Promise.all(roomPromises);
        
        if ( results.every( res => res.status === 201 ) ) {
          setSuccess('Propiedad y habitaciones guardadas con éxito');
        }

        if ( results.some( res => !([201, 200, 204].includes( res.status )) ) ) {
          setError('Error al guardar las habitaciones');
        } else {
          console.error('Error saving some rooms:', results);
          setError('Error al guardar algunas habitaciones');
        }
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      setError('Error al guardar la propiedad');
    } finally {
      setLoading(false);
      setIsHouseEditorOpen(false);
      setIsModalOpen(false);
      setIsRoomEditorOpen(false);
      setCreatedProperty(null);
      setCreatedRooms(null);
      setCreatedPropertyId(null);
    }
  }

  async function saveProperty() {
    try {
      const propertyRes = await apiRequest('post', `${ API_URL_HOUSE }/create`, createdProperty, {}, true);
      if (!propertyRes?.data?.insertId) {
        throw new Error('La propiedad no fue creada correctamente');
      }
      return propertyRes;
    } catch (error) {
      console.error('Error saving property:', error);
    }
  }

  async function saveRoom(room) {
    try {
      const roomRes = await apiRequest('post', `${ API_URL_ROOM }/create`, room, {}, true);
      return roomRes
    } catch (error) {
      console.error('Error saving room:', error);
    }
  }

  useEffect(() => {
    if ( success ) {
      swal.fire({
        title: 'Casa creada',
        text: success,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setSuccess(null);
    }

    if ( error ) {
      swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setError(null);
    }
  }, [ success, error, loading ]);

  useEffect(()=>{
    // check if not a host
    const condition = ({ typeuser }) => typeuser !== 1;
    const action = () => {
      swal.fire({
        title: 'Acceso denegado',
        text: 'No tienes permiso para acceder a esta página.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

    redirectBasedOnRole( '/', condition, action )

  }, [])

  return (
    <Layout>
      {loading && <AuthLoader />}
      
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
          closeModal={() => setIsHouseEditorOpen(false)}
          openRoomEditor={(room) => {
            setSelectedRoom(room || null);
            setIsRoomEditorOpen(true);
          }}
          closeHouseEditor={() => setIsHouseEditorOpen(false)}
          relatedRooms={ createdRooms }
          onSave={ handleSaveProperty }
          onRoomDelete={ handleDeleteRoom }
          onSubmit={ submitProperty }
        />
      )}

      {isRoomEditorOpen && (
        <RoomEditor
          firstStepValues={firstStepRoomValues}
          firstStepHandlers={firstStepRoomHandlers}
          secondStepValues={secondStepRoomValues}
          secondStepHandlers={secondStepRoomHandlers}
          closeModal={() => setIsRoomEditorOpen(false) }
          onSubmit={ handleSaveRoom }
        />
      )}

      {isPropertyOverviewOpen && (
        <PropertyOverview
          property_name={selectedProperty.home_name}
          property_description={selectedProperty.home_description}
          property_address={selectedProperty.address}
          property_tags={selectedProperty.tags}
          property_images={selectedProperty.images.map((img) => img.image_content)}
          property_main_image={selectedProperty.mainImage[0].image_content}
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
          property={properties.find( prop => prop.id_home === selectedRoom.id_home )}
          setSelectedProperty={setSelectedProperty}
          closeRoomOverviewOpen={()=>setIsRoomOverviewOpen(false)}
          setIsPropertyOverviewOpen={() => setIsPropertyOverviewOpen(true)}
        />
      )}
    </Layout>
  );
};