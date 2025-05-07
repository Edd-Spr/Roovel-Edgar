import Styles from './FirstStep.module.css';
import { motion } from 'framer-motion';
import ImageCropperRectangleHorizontal from '../../../ImageCropper/ImageCropperRectangleHorizontal';
import ImageCropperRect from '../../../ImageCropper/ImageCropperRectH';

export default function FirstStep({ values, handlers }) {
    const {
        errorMessage,
        mainImage,
        images,
        fileInputRef,
        croppingImage,
        isModalOpen,
        imageFile
    } = values;

    const {
        handleImageClick,
        handleMainFileChange,
        handleImageChange,
        handleCropComplete,
        handleCancelCrop,
        handleDeleteImage,
        setCroppedMainImage,
        setIsModalOpen,
    } = handlers;

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
                        src={ mainImage || "/Graphics/Icons/camera-icon.png"}
                        alt="Foto de perfil"
                        draggable="false"
                        style={{
                            pointerEvents: 'none',
                            cursor: 'pointer',
                            width: mainImage ? '100%' : '50%',
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
                    <img 
                        src="/Graphics/Icons/add-icon_gray.png" 
                        alt="Agregar imagen" 
                        draggable="false"
                        />
                </button>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />

                    {images?.map((imgSrc, index) => (
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