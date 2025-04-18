import Styles from './ThirdStep.module.css';
import { motion } from 'framer-motion';

const ThirdStep = ({ setHouseEditorProgress, allImageFiles, setPendingRooms, closeModal }) => {
    const handleSave = () => {
        const newRoom = {
            id: crypto.randomUUID(),
            images: allImageFiles.images,
            imageFiles: allImageFiles.imageFiles,
            mainImage: allImageFiles.croppedMainImage,
            createdAt: new Date().toISOString(), // opcional: para orden o registro
        };

        setPendingRooms(prev => [...prev, newRoom]);
        setHouseEditorProgress(0); 
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