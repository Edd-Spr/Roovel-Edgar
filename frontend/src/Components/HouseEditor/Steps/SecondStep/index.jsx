import Styles from './SecondStep.module.css';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import InputForm from '../../../InputForm/InputForm.jsx';

const SecondStep = ({setHouseEditorProgress}) => { 

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
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        > 
            <section className={Styles['second-step__inputs-container']}>
                <p className={Styles['second-step__title']}>Información de la casa</p>
                <InputForm Width='100%' title="Escribe tu nombre" type="text" />
                <div style={{display: 'flex', gap: '1rem', width: '100%'}}>
                <InputForm Width='100%' title="Tipo de propiedad" type="select" options={['', 'Masculino', 'Femenino']} />
                <InputForm Width='100%' title="precio mensual" type="number"/>
                </div>
                <InputForm Width='100%' title="Ubicacion" type="text" />
                <InputForm Height='29vh' Width='100%' title="Añade una descripción" type="area" />
            </section>
        </motion.article>
    )
}

export default SecondStep;