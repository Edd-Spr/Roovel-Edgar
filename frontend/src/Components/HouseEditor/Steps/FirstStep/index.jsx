import Styles from './FirstStep.module.css';
import { motion } from 'framer-motion';

const FirstStep = ({setHouseEditorProgress}) => { 

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
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={Styles['first-step__title']}>Comienza Agregando algunas Fotos</h1>
            <p className={Styles['first-step__note']}>Nota: Para atraer más inquilinos, te recomendamos subir imágenes nítidas y representativas de tu propiedad, como cocina, baño, salas comunes, etc</p>
            <div className={Styles['first-step__image-container']}>
                <input 
                    type="file"    
                    name="" 
                    id="" 
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                    }}
                    />
            </div>
            <div className={Styles['first-step__more-images-container']}>
                <button></button>
            </div>
        </motion.article>
    )
}

export default FirstStep;