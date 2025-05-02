import Styles from './SecondStep.module.css';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import InputForm from '../../../InputForm/InputForm.jsx';

const SecondStep = ({setHouseEditorProgress}) => { 

    const [selectedTags, setSelectedTags] = useState([]);

    function onToggleTag(e) {
        e.preventDefault();
        const tag = e.target.value;

        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((n) => n !== tag) : [...prev, tag]
        );
    }

    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
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

            <section className={Styles['second-step__tags-container']}>
                <p className={Styles['tagsTitle']}>Elige etiquetas que describan tu propiedad</p>
                <div className={Styles['firstStepTagsContainer']}>
                    {tags.map((tag, i) => (
                        <button
                            key={i}
                            value={tag}
                            onClick={ onToggleTag }
                            className={selectedTags.includes(tag) ? Styles['activeTag'] : Styles['tagFirstStep']}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

            </section>
        </motion.article>
    )
}

let tags = [
    "Lectura", "Deportes", "Tecnología", "Cine", "Música", "Viajes", "Arte", "Fotografía", 
    "Videojuegos", "Naturaleza", "Desarrollador", "DiseñadorGráfico", "Ingeniero", "MarketingDigital", 
    "Escritor", "Cocinero", "Creativo", "Emprendedor", "Educador", "Consultor", "Optimista", 
    "Aventurero", "Curioso", "Introvertido", "Extravertido", "Empático", "Líder", "Soñador", 
    "Perseverante", "Amor", "Equidad", "Innovación", "Sostenibilidad", "Igualdad", "Familia", 
    "Responsabilidad", "TrabajoEnEquipo", "CrecimientoPersonal", "AprenderNuevo", "DesarrolloProfesional", 
    "Networking", "Inspiración", "Motivación", "Productividad", "Bilingüe", "Cultura", "Multicultural", 
    "Idiomas", "ArteCultural", "EstilosDeVida", "Meditación", "SaludMental", "Ejercicio", "Yoga", 
    "ComidaSaludable", "Bienestar", "Influencer", "Vlogs", "Streaming", "Tendencias", "Memes", 
    "CulturaPop", "Voluntariado", "Mentoría", "Colaboración", "RedesProfesionales", "Comunidad"
];


export default SecondStep;