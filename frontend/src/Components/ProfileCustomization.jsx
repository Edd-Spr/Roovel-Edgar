import { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/ProfileCustomization.css'
import InputForm from '../Components/InputForm';

const ProfileCustomization = () => {

    const [customProgress, setCustomProgress] = useState(1)
    return(
        <>
        { customProgress == 1 && <FirstStep customProgress={customProgress} setCustomProgress={setCustomProgress} />}
        { customProgress == 2 && <FirstStep customProgress={customProgress} setCustomProgress={setCustomProgress} />}
        { customProgress == 3 && <FirstStep customProgress={customProgress} setCustomProgress={setCustomProgress} />}
        </>
    )
}

const FirstStep = ({customProgress, setCustomProgress}) => {

    
    const [selectedTags, setSelectedTags] = useState([])

    function toggleTag(tag){
        setSelectedTags((prev)=>
            prev.includes(tag) ?
            prev.filter((n)=> n !== tag) : 
            [...prev, tag]
        )
    }
    return(
        <motion.article 
        className="profileCustomizationMainBox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        >
        <section className="inputsPersonalInfoContainer">
            <p className='titlePersonalInfo'>Personalizar Perfil</p>
            <InputForm
                Width='30vw'
                title="Escribe tu nombre" 
                type="text"
            />
            <InputForm
                Width='8.5vw'
                title="Cumple años" 
                type="date"
            />
            <InputForm
                Width='11vw'
                title="Genero" 
                type="select"
                options={['', 'Masculino', 'Femenino']}
            />
            <InputForm
                Width='8.5vw'
                title="Pronombres" 
                type="select"
                options={['', 'El/He', 'Ella/She', 'Elle/They']}
            />
            <InputForm
                Width='30vw'
                title="Lugar donde buscas compañero" 
                type="text"
            />
            <InputForm
                Height='30vh'
                Width='30vw'
                title="Añade una descripción" 
                type="text"
            />
            
        </section>
        <section className="firstStepTagsMainContainer">
            <div className="firstStepPhotoProfileContainer">
                <img 
                    src="/Graphics/Icons/camera-icon.png" 
                    alt="" 
                    draggable="false"
                    style={{pointerEvents: 'none', cursor: 'pointer', width: '50%'}}
                    />
                <input 
                    type="file" 
                    name="" 
                    id="" 
                    className='inputFilePhotoProfile'
                    accept='image/png, image/jpeg, image/jpg, image/gif, image/webp'
                    />
            </div>
            <p className='tagsTitle'>Elige etiquetas que te describan</p>
            <div className="firstStepTagsContainer">
                {tags.map((tag, i) => 
                    <button  
                        key={i} 
                        onClick={()=>toggleTag(tag)}
                        className={selectedTags.includes(tag) ? 'activeTag' : 'tagFirstStep'}
                        > {tag}</button>)}
            </div>
            <button className="nextStep" onClick={()=>{console.log(selectedTags), setCustomProgress(customProgress+1)}}>Siguiente</button>
        </section>
        <section className="customProgressContainer">
            <button className={`customProgressButton ${customProgress >= 1 && 'activeCustomProgressButton'}`}>1</button>
            <button className={`customProgressButton ${customProgress >= 2 && 'activeCustomProgressButton'}`}>2</button>
            <button className={`customProgressButton ${customProgress >= 3 && 'activeCustomProgressButton'}`}>3</button>
        </section>
    </motion.article>
    )
}

export default ProfileCustomization;

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
]
