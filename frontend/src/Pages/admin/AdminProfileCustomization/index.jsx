import { useState } from 'react';
import { motion } from 'framer-motion';
import Styles from './ProfileCustomization.module.css';
import InputForm from '../../../Components/InputForm/InputForm.jsx';
import ImageCropperModal from '../../../Components/ImageCropper/ImageCropper.jsx';

export default function ProfileCustomization({ onSubmit }) {
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const [ gender, setGender ] = useState('')
    const [ pronouns, setPronouns ] = useState('')

    const onLocalSubmit = (e, data) => {
        e.preventDefault();
        onSubmit(e, data);
    }

    function onGenderChange(e) {
        setGender(e.target.value);
    }
    function onPronounsChange(e) {
        setPronouns(e.target.value);
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
            <form action="">

            <section className={Styles.inputsPersonalInfoContainer}>
                <p className={Styles.titlePersonalInfo}>Personalizar Perfil</p>
                <InputForm Width='30vw' title="Escribe tu nombre" type="text" />
                <InputForm Width='8.5vw' title="Cumpleaños" type="date" />
                <InputForm Width='11vw' title="Género" type="select" options={['', 'Masculino', 'Femenino']} onChange={ onGenderChange } />
                <InputForm Width='8.5vw' title="Pronombres" type="select" options={['', 'Él/He', 'Ella/She', 'Elle/They']} onChange={ onPronounsChange } />
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

                <button 
                    className={Styles.nextStep} 
                    onClick={ (e) => onLocalSubmit(e, { imageFile, pronouns, gender } ) }>
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