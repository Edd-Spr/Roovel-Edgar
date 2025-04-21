import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Styles from './RoomEditor.module.css';

//Steps ------------------------------------------------
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
// -----------------------------------------------------

const RoomEditor = ({ room, closeModal, pendingRooms, setPendingRooms }) => {
  const [houseEditorProgress, setHouseEditorProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [croppedMainImage, setCroppedMainImage] = useState(room?.mainImage[0].image_content || null);

  useEffect(() => {
    if (room?.images && room.images.length > 0) {
        const imageUrls = room.images.map((image) => image.image_content);
        setImages(imageUrls);
        setImageFiles(room.images);
    }
}, [room]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const allImageFiles = {
    images,
    imageFiles,
    setImages,
    setImageFiles,
    imageFile,
    setImageFile,
    croppedMainImage,
    setCroppedMainImage,
  };

  const back = () => {
    if (houseEditorProgress > 0) {
      setHouseEditorProgress(houseEditorProgress - 1);
    }
  };

  const next = () => {
    if (houseEditorProgress < 3) {
      setHouseEditorProgress(houseEditorProgress + 1);
    }
  };

  return (
    <article className={Styles['house-editor__overlay']}>
      <section className={Styles['house-editor__card-container']}>

        {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={setHouseEditorProgress} />}
        {houseEditorProgress === 1 && (
          <FirstStep allImageFiles={allImageFiles} room={room}>
            <div className={Styles['image-uploader']}>
              <label className={Styles['image-label']}>
                Subir imágenes del cuarto:
                <input type="file" multiple onChange={handleImageUpload} />
              </label>
              <div className={Styles['preview-container']}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    className={Styles['image-preview']}
                    draggable="false"
                  />
                ))}
              </div>
            </div>
          </FirstStep>
        )}
        {houseEditorProgress === 2 && <SecondStep />}
        {houseEditorProgress === 3 && 
            <ThirdStep
                setHouseEditorProgress={setHouseEditorProgress}
                allImageFiles={allImageFiles}
                setPendingRooms={setPendingRooms}
                closeModal={closeModal}
            />}

        {/* Navegación entre pasos */}
        {houseEditorProgress > 0 && (
          <div className={Styles['house-editor__progress']}>
            <button className={Styles['pogress__button-back']} onClick={back}>Atrás</button>
            {Array.from({ length: 3 }).map((_, i) => (
              <p
                key={i}
                className={
                  i < houseEditorProgress
                    ? Styles['house-editor__progress-circle--active']
                    : Styles['house-editor__progress-circle']
                }
              >
                {i + 1}
              </p>
            ))}
            {houseEditorProgress < 3 && <button className={Styles['pogress__button-next']} onClick={next}>Siguiente</button>}
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

export default RoomEditor;