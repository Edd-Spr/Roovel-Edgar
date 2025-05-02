import Styles from './ThirdStep.module.css';
import { motion } from 'framer-motion';

const ThirdStep = ({ setHouseEditorProgress, allImageFiles, setPendingRooms, closeModal, room }) => {
    const handleSave = () => {
        // Procesa las imágenes para asegurarte de que todas sean URLs válidas
        const processedImages = allImageFiles.imageFiles.map((file) => {
            if (file.image_content) {
                // Si es una imagen existente, usa su URL
                return file.image_content;
            } else if (file instanceof File) {
                // Si es un archivo nuevo, genera una URL temporal
                return URL.createObjectURL(file);
            }
            return null;
        }).filter(Boolean); // Filtra valores nulos o inválidos

        const processedMainImage = allImageFiles.croppedMainImage?.image_content
            ? allImageFiles.croppedMainImage.image_content // Si es una imagen existente
            : allImageFiles.croppedMainImage instanceof File
            ? URL.createObjectURL(allImageFiles.croppedMainImage) // Si es un archivo nuevo
            : allImageFiles.croppedMainImage; // Si ya es una URL válida

        const newRoom = {
            ...room, // Si estás editando, conserva los datos existentes
            id_room: room?.id_room || crypto.randomUUID(), // Usa el ID existente o genera uno nuevo
            images: processedImages, // Usa las imágenes procesadas
            mainImage: processedMainImage, // Usa la imagen principal procesada
        };

        setPendingRooms((prev) => {
            if (room) {
                // Si estás editando, actualiza la habitación existente
                return prev.map((r) => (r.id_room === room.id_room ? newRoom : r));
            } else {
                // Si estás creando, agrega una nueva habitación
                return [...prev, newRoom];
            }
        });

        setHouseEditorProgress(0); // Reinicia el progreso del editor
        closeModal(); // Cierra el modal después de guardar
    };

    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={Styles['third-step__title']}>Habitación terminada</h1>
            <button className={Styles['third-step__button']} onClick={handleSave}>
                Guardar
            </button>
        </motion.article>
    );
};

export default ThirdStep;