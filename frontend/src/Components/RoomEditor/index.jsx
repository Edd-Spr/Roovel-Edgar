import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Styles from './RoomEditor.module.css';

//Steps ------------------------------------------------
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
// -----------------------------------------------------

export default function RoomEditor({ room, closeModal, pendingRooms, setPendingRooms }) {
  // const isEditing = !!room; // Determina si estás editando o creando
  const [houseEditorProgress, setHouseEditorProgress] = useState(0);

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [croppedMainImage, setCroppedMainImage] = useState();

  const [info, setInfo] = useState({
    name: room?.name || '',
    propertyType: room?.propertyType || '',
    price: room?.price || null,
    address: room?.address || '',
    description: room?.description || '',
    tags: room?.tags || [],
  });
  const [selectedTags, setSelectedTags] = useState(room?.tags || []);

  useEffect(() => {
    if (room?.images && room.images.length > 0) {
      const imageUrls = room.images.map((image) => image.image_content);
      setImages(imageUrls);
      setImageFiles(room.images);
    }
  }, [room]);

  const handleSave = () => {
    const newRoom = {
      ...room, // Si estás editando, conserva los datos existentes
      name: info.name,
      propertyType: info.propertyType,
      price: info.price,
      address: info.address,
      description: info.description,
      tags: selectedTags,
      mainImage: [{ image_content: croppedMainImage }],
      images: imageFiles,
    };

    if (isEditing) {
      // Actualiza la habitación existente
      const updatedRooms = pendingRooms.map((r) =>
        r.id_room === room.id_room ? newRoom : r
      );
      setPendingRooms(updatedRooms);
    } else {
      // Crea una nueva habitación
      const newRoomWithId = {
        ...newRoom,
        id_room: Date.now(), // Genera un ID único para la nueva habitación
      };
      setPendingRooms([...pendingRooms, newRoomWithId]);
    }

    closeModal(); // Cierra el modal después de guardar
  };

  return (
    <article className={Styles['house-editor__overlay']}>
      <section className={Styles['house-editor__card-container']}>

        {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={setHouseEditorProgress} />}
        {houseEditorProgress === 1 && (
          <FirstStep allImageFiles={{ images, setImages, imageFiles, setImageFiles, croppedMainImage, setCroppedMainImage }} />
        )}
        {houseEditorProgress === 2 && (
          <SecondStep info={info} setInfo={setInfo} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        )}
        {houseEditorProgress === 3 && (
          <ThirdStep
            setHouseEditorProgress={setHouseEditorProgress}
            allImageFiles={{
                images,
                imageFiles,
                croppedMainImage,
            }}
            setPendingRooms={setPendingRooms}
            closeModal={closeModal}
            room={room}
        />
        )}

        {/* Navegación entre pasos */}
        {houseEditorProgress > 0 && (
          <div className={Styles['house-editor__progress']}>
            <button className={Styles['pogress__button-back']} onClick={() => setHouseEditorProgress(houseEditorProgress - 1)}>
              Atrás
            </button>
            {houseEditorProgress < 3 && (
              <button className={Styles['pogress__button-next']} onClick={() => setHouseEditorProgress(houseEditorProgress + 1)}>
                Siguiente
              </button>
            )}
          </div>
        )}

        {/* Botón de cerrar */}
        <div className={Styles['house-editor__close']}>
          <img
            src="/Graphics/Icons/close_dark.png"
            alt="Cerrar"
            draggable="false"
            style={{ width: '80%', height: '80%' }}
            onClick={closeModal}
          />
        </div>

      </section>
    </article>
  );
};