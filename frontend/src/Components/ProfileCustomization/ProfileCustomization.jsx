import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Styles from './ProfileCustomization.module.css';
import InputForm from '../InputForm/InputForm.jsx';
import BounceLoader from "react-spinners/BounceLoader";
import ImageCropperModal from '../ImageCropper/ImageCropper.jsx';
import ImageCropperRect from '../ImageCropper/ImageCropperRectangle.jsx';

const landlordMessage = "Esta opción no está disponible para arrendadores."
const ProfileCustomization = ({ userType, onFirstSubmit, onSecondSubmit, onThirdSubmit }) => {
    const [customProgress, setCustomProgress] = useState(1);
    const [customizationIsLoading, setCustomizationIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleFirstSubmit = (e, data) => {
        e.preventDefault();
        if ( onFirstSubmit(e, data) ) {
            // Should the user is a landlord, we skip the second step
            // and go directly to the third step.
            setCustomProgress( customProgress + ( ( userType === 1 ) ? 2 : 1 ) );
        }
    }
    const handleSecondSubmit = ( option ) => {
        onSecondSubmit( option );
        setCustomProgress(customProgress + 1);
    }
    const handleThirdSubmit = async ( data ) => {
        const res = await onThirdSubmit( data );
        
        setCustomizationIsLoading(false)
        if ( res ) {
            navigate('/');//TODO: Cambiar a la ruta de la página principal basado en el rol del usuario
        };
    }

    const handleBack = () => {
        if (customProgress > 1) {
            setCustomProgress(customProgress - 1);
        }

        if ( customProgress >= 2 && userType === 1 ) {
            setCustomProgress(customProgress - 2);
        }

    }

    return (
        <article className={Styles.profileCustomizationMainBox}>
            {customProgress === 1 && ( 
                <FirstStep 
                    customProgress={customProgress} 
                    onSubmit={ handleFirstSubmit } 
                />) }
            { ( customProgress === 2 && userType !== 1 ) && ( 
                <SecondStep 
                    customProgress={customProgress} 
                    onSubmit={ handleSecondSubmit } 
                    onBack={ handleBack } 
                />) }
            {customProgress === 3 && ( 
                <ThirdStep 
                    customProgress={customProgress} 
                    setCustomProgress={setCustomProgress} 
                    setCustomizationIsLoading={setCustomizationIsLoading} 
                    customizationIsLoading={customizationIsLoading}
                    onBack={ handleBack }
                    onSubmit={ handleThirdSubmit }
                />) }
            {customProgress === 4 && ( 
                <ResultProfileCustomization 
                    customProgress={customProgress} 
                    setCustomProgress={setCustomProgress} 
                />) }

            {customProgress < 4 && 
            <section className={Styles.customProgressContainer}>
                <button 
                    className={`${Styles.customProgressButton} ${customProgress >= 1 && Styles.activeCustomProgressButton}`} 
                    onClick={ () => setCustomProgress(1) }>1</button>
                <button 
                    title={ landlordMessage } 
                    className={`${Styles.customProgressButton} ${customProgress >= 2 && Styles.activeCustomProgressButton}`} 
                    disabled={ userType === 1 }
                    onClick={ () => setCustomProgress(2) }>2</button>
                <button 
                    className={`${Styles.customProgressButton} ${customProgress >= 3 && Styles.activeCustomProgressButton}`}
                    onClick={ () => setCustomProgress(3) }>3</button>
            </section>}

            {customizationIsLoading && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className=""
            >
                <CustomizationLoader />
            </motion.div>
        )}
        </article>
    );
};

const CustomizationLoader = () => {
    return(
        <section className={Styles.customizationLoader}>
            <BounceLoader  size='100' color='#4A617F'/>
        </section>
    )
}
 
const FirstStep = ({ onSubmit }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const [ gender, setGender ] = useState('')
    const [ pronouns, setPronouns ] = useState('')

    function onGenderChange(e) {
        setGender(e.target.value);
    }
    function onPronounsChange(e) {
        setPronouns(e.target.value);
    }

    function onToggleTag(e) {
        e.preventDefault();
        const tag = e.target.value;

        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((n) => n !== tag) : [...prev, tag]
        );
    }

    function handleFileChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImageFile(URL.createObjectURL(file));
            setIsModalOpen(true);
            e.target.value = "";
        }
    }

    return (
        <motion.article
            className={Styles.profileCustomizationMainBox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <form action="" className={Styles.profileCustomizationMainBox}>

            <section className={Styles.inputsPersonalInfoContainer}>
                <p className={Styles.titlePersonalInfo}>Personalizar Perfil</p>
                <InputForm Width='30vw' title="Escribe tu nombre" type="text" />
                <InputForm Width='8.5vw' title="Cumpleaños" type="date" />
                <InputForm Width='11vw' title="Género" type="select" options={['', 'Masculino', 'Femenino']} onChange={ onGenderChange } />
                <InputForm Width='8.5vw' title="Pronombres" type="select" options={['', 'Él/He', 'Ella/She', 'Elle/They']} onChange={ onPronounsChange } />
                <InputForm Width='30vw' title="Lugar donde buscas compañero" type="text" />
                <InputForm Height='29vh' Width='30vw' title="Añade una descripción" type="area" />
            </section>

            <section className={Styles.firstStepTagsMainContainer}>
                <div className={Styles.firstStepPhotoProfileContainer}>
                    <img 
                        src={croppedImage || "/Graphics/Icons/camera-icon.png"} 
                        alt="Foto de perfil" 
                        draggable="false"
                        style={{ pointerEvents: 'none', cursor: 'pointer', width: '100%', height: '100%', borderRadius: '50%' }}
                        onClick={() => setIsModalOpen(true)}
                    />
                    <input 
                        type="file" 
                        className={Styles.inputFilePhotoProfile}
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                        onChange={handleFileChange}
                    />
                </div>

                <p className={Styles.tagsTitle}>Elige etiquetas que te describan</p>
                <div className={Styles.firstStepTagsContainer}>
                    {tags.map((tag, i) => (
                        <button
                            key={i}
                            value={tag}
                            onClick={ onToggleTag }
                            className={selectedTags.includes(tag) ? Styles.activeTag : Styles.tagFirstStep}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <button className={Styles.nextStep} onClick={ (e) => onSubmit(e, { selectedTags, imageFile, pronouns, gender } ) }>
                    Siguiente
                </button>
            </section>


            {isModalOpen && (
                <ImageCropperModal 
                    imageSrc={imageFile}  
                    onClose={() => setIsModalOpen(false)}
                    onCropComplete={(croppedImg) => { 
                        setCroppedImage(croppedImg);
                        setIsModalOpen(false);
                    }}
                />
            )}
            </form>
        </motion.article>
    );
};

const SecondStep = ({ onSubmit, onBack }) => {
    function chooseCard( option ) { onSubmit( option ) }
    
    return (
        <motion.article
            className={Styles.profileCustomizationMainBox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <section className={Styles.choseBoxContainer}>
                <p className={Styles.chooseBoxTitle}>¿Que estás buscando?</p>
                <ChoseBox title='Roomie' image='/Graphics/choose-roomie.png' onClick={() => chooseCard( 1 ) } />
                <ChoseBox title='Habitación' image='/Graphics/choose-room.png' onClick={() => chooseCard( 2 ) } />
                <ChoseBox title='Ambos' image='/Graphics/choose-both.png' onClick={() => chooseCard( 3 ) }/>
                <button className={Styles.goBack} onClick={ onBack }>Atrás</button>
            </section>
        </motion.article>
    );

    function ChoseBox({title, image, onClick}) {
        return(
            <div className={Styles.chooseBox} onClick={ onClick }>
                <p className={Styles.chooseBoxTitleCard}>{title}</p>
                <img 
                    src={image} 
                    alt="" 
                    style={{width: '100%', position: 'absolute', }}
                    />
            </div>
        )
    }
};

const ThirdStep = ({ onBack, onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null); 
    const [images, setImages] = useState([null, null, null, null]);

    function handleFileChange(event, index) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImageFile(fileURL);
            setSelectedIndex(index);
            setIsModalOpen(true);
        }
    }

    function handleCropComplete(croppedImg) {
        if (selectedIndex !== null && croppedImg) {
            setImages((prevImages) => {
                const newImages = [...prevImages];
                newImages[selectedIndex] = croppedImg;
                return newImages;
            });
        }
        setIsModalOpen(false);
    }

    function finish() {
        onSubmit( images )
    }

    return (
        <motion.article
            className={Styles.profileCustomizationMainBox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <section className={Styles.photosBoxContainer}>
                <p className={Styles.photosBoxTitle}>Una imagen dice más que mil palabras, <br/> ¡muéstráte!</p>
                <p className={Styles.subTitlePhotosBox}>Las imágenes ayudan a conectar. Sube al menos una foto para terminar</p>
                
                {images.map((image, index) => (
                    <InputSelectPhoto 
                        key={index} 
                        index={index} 
                        image={image} 
                        onFileChange={handleFileChange} 
                    />
                ))}

                <button onClick={ onBack } className={Styles.backButtonThirdStep}>Atrás</button>
                <button onClick={ finish }>Terminar</button>
            </section>

            {isModalOpen && imageFile && (
                <ImageCropperRect 
                    imageSrc={imageFile} 
                    onCropComplete={handleCropComplete} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </motion.article>
    );
};

function InputSelectPhoto({ index, image, onFileChange }) {
    return (
        <div className={Styles.inputSelectPhoto} onClick={() => document.getElementById(`file-input-${index}`).click()}>
            <img 
                src={image || '/Graphics/Icons/photo-icon.png'} 
                alt={`Imagen de perfil ${index + 1}`} 
                className={Styles.photoPreview} 
            />
            <input 
                type="file" 
                id={`file-input-${index}`} 
                className={Styles.inputFile}
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                onChange={(e) => onFileChange(e, index)}
                style={{ display: 'none' }} 
            />
        </div>
    );
}

const ResultProfileCustomization = ({ customProgress, setCustomProgress }) => {
    return (
        <motion.article
            className={Styles.profileCustomizationMainBox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <section className={Styles.resultBoxContainer}>
                <p className={Styles.resultTitle}>¡Listo! Tu perfil ha sido personalizado con éxito.</p>

                <button className={Styles.finishButton} onClick={() => setCustomProgress(customProgress + 1)}>
                    ¡Finalizar!
                </button>
            </section>
        </motion.article>
    );
};

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
];
