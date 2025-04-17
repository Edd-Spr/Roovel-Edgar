import Styles from './FirstStep.module.css';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ImageCropperRectangleHorizontal from '../../../ImageCropper/ImageCropperRectangleHorizontal';
import ImageCropperRect from '../../../ImageCropper/ImageCropperRectH';

const FirstStep = ({ allImageFiles }) => {
    const fileInputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { images, 
            imageFiles, 
            setImages, 
            setImageFiles, 
            imageFile, 
            setImageFile, 
            croppedMainImage, 
            setCroppedMainImage
          } = allImageFiles;

    const [croppingImage, setCroppingImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Maneja el clic para abrir el input de archivo
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Maneja el cambio de archivo en el contenedor principal
    const handleMainFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(URL.createObjectURL(file));
            setIsModalOpen(true);
            event.target.value = "";
        }
    };

    // Maneja el cambio de archivo para imágenes adicionales
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newFile = files[0];

        if (!newFile) return;

        const isDuplicate = imageFiles.some((existingFile) => existingFile.name === newFile.name);
        if (isDuplicate) {
            setErrorMessage("No puedes subir la misma imagen 2 veces");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        const newImageUrl = URL.createObjectURL(newFile);
        setCroppingImage(newImageUrl);
        setOriginalFile(newFile);

        e.target.value = "";
    };

    // Maneja el recorte completo de la imagen
    const handleCropComplete = (croppedImageBlob) => {
        if (!croppedImageBlob) return;

        const imageUrl = URL.createObjectURL(croppedImageBlob);
        setImages((prev) => [...prev, imageUrl]);
        setImageFiles((prev) => [...prev, originalFile]);

        setCroppingImage(null);
        setOriginalFile(null);
    };

    // Maneja la cancelación del recorte
    const handleCancelCrop = () => {
        setCroppingImage(null);
        setOriginalFile(null);
    };

    // Maneja la eliminación de una imagen adicional
    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                boxSizing: 'border-box',
                padding: '3rem',
                paddingBottom: '4rem',
                overflowY: 'scroll',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={Styles['first-step__title']}>Comienza Agregando algunas Fotos</h1>

            <div className={Styles['first-step__note']}>
                {errorMessage ? (
                    <div className={Styles['first-step__error-message']}>{errorMessage}</div>
                ) : (
                    <p className={Styles['first-step__note-text']}>
                        Nota: Para atraer más inquilinos, te recomendamos subir imágenes nítidas y representativas de tu propiedad, como cocina, baño, salas comunes, etc.
                    </p>
                )}
            </div>

            <section style={{ width: '100%', height: '100%', display: 'flex' }}>
                {/* Contenedor principal */}
                <div className={Styles['first-step__image-container']}>
                    <div className={Styles['image-container__title']}>
                        Fachada de la propiedad
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        style={{
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                        onChange={handleMainFileChange}
                    />
                    <img
                        src={croppedMainImage || "/Graphics/Icons/camera-icon.png"}
                        alt="Foto de perfil"
                        draggable="false"
                        style={{
                            pointerEvents: 'none',
                            cursor: 'pointer',
                            width: croppedMainImage ? '100%' : '50%',
                        }}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                {/* Contenedor de imágenes adicionales */}
                <div className={Styles['first-step__more-images-container']}>
                <button
                    className={Styles['first-step__button-add-image']}
                    onClick={handleImageClick}
                >
                    <img src="/Graphics/Icons/add-icon_gray.png" alt="Agregar imagen" />
                </button>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />

                    {images.map((imgSrc, index) => (
                        <NewImage
                            key={index}
                            src={imgSrc}
                            onDelete={() => handleDeleteImage(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Cropper para imágenes adicionales */}
            {croppingImage && (
                <ImageCropperRectangleHorizontal
                    imageSrc={croppingImage}
                    onCropComplete={handleCropComplete}
                    onClose={handleCancelCrop}
                />
            )}

            {/* Cropper para el contenedor principal */}
            {isModalOpen && (
                <ImageCropperRect
                    imageSrc={imageFile}
                    onClose={() => setIsModalOpen(false)}
                    onCropComplete={(croppedImg) => {
                        setCroppedMainImage(croppedImg);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </motion.article>
    );
};

const NewImage = ({ src, onDelete }) => {
    return (
        <div className={Styles['first-step__image-image-container']}>
            <img
                src={src}
                alt=""
                draggable="false"
                style={{ height: '100%', transition: '0.3s' }}
            />
            <div
                className={Styles['image-container__button-delete']}
                onClick={onDelete}
                style={{ cursor: 'pointer' }}
            >
                <img
                    src="/Graphics/Icons/close.png"
                    alt="Eliminar"
                    draggable="false"
                    style={{ height: '100%' }}
                />
            </div>
        </div>
    );
};

export default FirstStep;