import Styles from './FourthStep.module.css';
import { motion } from 'framer-motion';

const FourthStep = ({setRoomEditorIsOpen}) => { 

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
                overflowY: 'auto',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={Styles['fourth-step__title']}>Personalizar Habitaciones (Opcional)</h1>

            <section className={Styles['fourth-step__note']}>
                    <p className={Styles['fourth-step__note-text']}>
                        Puedes añadir y personalizar habitaciones para alquilarlas por separado, o si prefieres alquilar la casa completa unicamente pasa al siguiente paso
                    </p>
            </section>
            <section className={Styles['fourth-step__rooms-container']}>
            <button className={Styles['fourth-step__add-room']} onClick={() => setRoomEditorIsOpen(true)}></button>
            <button className={Styles['fourth-step__add-room']}></button>
            <button className={Styles['fourth-step__add-room']}></button>
            </section>

            
    </motion.article>
    )
}

export default FourthStep;