import Styles from './SecondStep.module.css';
import { motion } from 'framer-motion';
import InputForm from '../../../InputForm/InputForm.jsx';

export default function SecondStep({ values, handlers }) {
    const { 
        handlePropertyNameChange: handleRoomNameChange,
        handlePropertyPriceChange: handleRoomPriceChange,
        handlePropertyDescriptionChange: handleRoomDescriptionChange,
        handleTagsChange 
    } = handlers;
    const { 
        propertyName: roomName,
        propertyPrice: roomPrice,
        propertyDescription: roomDescription,
        propertyTags: roomTags
    } = values;

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
                <p className={Styles['second-step__title']}>Información</p>
                <InputForm
                    Width="100%"
                    title="Nombre de la habitación"
                    type="text"
                    content={ roomName}
                    onChange={ handleRoomNameChange }
                />
                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <InputForm
                        Width="100%"
                        title="Precio mensual"
                        type="number"
                        content={ roomPrice }
                        onChange={ handleRoomPriceChange }
                    />
                </div>
                <InputForm
                    Height="40vh"
                    Width="100%"
                    title="Añade una descripción"
                    type="area"
                    content={ roomDescription }
                    onChange={ handleRoomDescriptionChange}
                />
            </section>

            <section className={Styles['second-step__tags-container']}>
                <p className={Styles['tagsTitle']}>Elige etiquetas que describan la habitación</p>
                <div className={Styles['firstStepTagsContainer']}>
                    {tags.map((tag, i) => (
                        <button
                            key={i}
                            value={tag}
                            onClick={ handleTagsChange}
                            className={roomTags?.includes(tag) ? Styles['activeTag'] : Styles['tagFirstStep']}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </section>
        </motion.article>
    );
};

let tags = [
    'Lectura',
    'Deportes',
    'Tecnología',
    'Cine',
    'Música',
    'Viajes',
    'Arte',
    'Fotografía',
    'Videojuegos',
    'Naturaleza',
    'Desarrollador',
    'DiseñadorGráfico',
    'Ingeniero',
    'MarketingDigital',
    'Escritor',
    'Cocinero',
    'Creativo',
    'Emprendedor',
    'Educador',
    'Consultor',
    'Optimista',
    'Aventurero',
    'Curioso',
    'Introvertido',
    'Extravertido',
    'Empático',
    'Líder',
    'Soñador',
    'Perseverante',
    'Amor',
    'Equidad',
    'Innovación',
    'Sostenibilidad',
    'Igualdad',
    'Familia',
    'Responsabilidad',
    'TrabajoEnEquipo',
    'CrecimientoPersonal',
    'AprenderNuevo',
    'DesarrolloProfesional',
    'Networking',
    'Inspiración',
    'Motivación',
    'Productividad',
    'Bilingüe',
    'Cultura',
    'Multicultural',
    'Idiomas',
    'ArteCultural',
    'EstilosDeVida',
    'Meditación',
    'SaludMental',
    'Ejercicio',
    'Yoga',
    'ComidaSaludable',
    'Bienestar',
    'Influencer',
    'Vlogs',
    'Streaming',
    'Tendencias',
    'Memes',
    'CulturaPop',
    'Voluntariado',
    'Mentoría',
    'Colaboración',
    'RedesProfesionales',
    'Comunidad',
];