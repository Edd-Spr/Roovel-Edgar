import Styles from './StartStep.module.css';
import { motion } from 'framer-motion';

const StartStep = ({setHouseEditorProgress, onClose }) => { 

    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: '#C98765',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className={ Styles['start-Step__image-container'] }>
                <img 
                    src="/Graphics/advertising-image-div.jpeg" 
                    alt="" 
                    draggable="false"
                    style={{ height: '100%'}}
                />
            </div>

            <div className={ Styles['start-Step__text-container'] }>
                <h1 className={ Styles['start-Step__title'] }>Personaliza tu casa</h1>
                <p className={ Styles['start-Step__subtitle'] }>Agrega fotos, detalles y habitaciones para atraer a más personas</p>
                <button 
                    onClick={() => setHouseEditorProgress(1)}
                    className={ Styles['start-Step__button-1'] }> Comenzar </button>
                <button className={ Styles['start-Step__button-2'] } onClick={ onClose }>Cancelar</button>
            </div>
    </motion.article>
    )
}

export default StartStep;