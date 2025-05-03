import { useState } from 'react';
import Styles from './HouseEditor.module.css';

// Steps
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import FourthStep from './Steps/FourthStep';
import FifthStep from './Steps/FifthStep';

import useMainImages from '../../Pages/PropertyManager/hooks/useMainImages';
import useInfoProperty from '../../Pages/PropertyManager/hooks/useInfoProperty';
import useLocation from '../../Pages/PropertyManager/hooks/useLocation';

export default function HouseEditor({ openRoomEditor, relatedRooms, closeHouseEditor, onSave }) {
    const [houseEditorProgress, setHouseEditorProgress] = useState(0);

    const {
        images,
        mainImage,
        fileInputRef,
        errorMessage,
        handleImageClick,
        handleMainFileChange,
        handleImageChange,
        handleCropComplete,
        handleCancelCrop,
        handleDeleteImage,
        croppingImage,
        setCroppedMainImage,
        isModalOpen,
        setIsModalOpen,
        imageFile,
        setImageFile,
        originalFile,
        setOriginalFile
    } = useMainImages();

    const { 
        propertyName, 
        propertyType, 
        propertyPrice,
        propertyDescription, 
        propertyTags, 
        handlePropertyNameChange, 
        handlePropertyTypeChange, 
        handlePropertyPriceChange, 
        handlePropertyDescriptionChange, 
        handleTagsChange,
    } = useInfoProperty();
    
    const {
        propertyLocation,
        setPropertyLocation,
        setPropertyCoordinates,
        handlePropertyLocationChange
    } = useLocation();

    const [temporaryRooms, setTemporaryRooms] = useState([]);

    function backStep() {
        if (houseEditorProgress > 0)
            setHouseEditorProgress(houseEditorProgress - 1);
    };

    function nextStep() {
        const increment = () => setHouseEditorProgress(houseEditorProgress + 1);

        if ( houseEditorProgress === 4) { 
            const propertyData = convertPropertyToJSON();
            //TODO: Save property data
            onSave(propertyData);
            increment();
        }
        if (houseEditorProgress < 5) 
            increment();
    };

    function convertPropertyToJSON() {
        const propertyData = {
            name: propertyName,
            type: propertyType,
            price: propertyPrice,
            description: propertyDescription,
            tags: propertyTags,
            location: propertyLocation,
            images: [ mainImage, ...images ],// the main image is the first one
        };

        return JSON.stringify(propertyData);
    }

    function onMapSubmit(e, data) {
        e.preventDefault();
        const { lat, lng, readableLoc } = data;
        setPropertyCoordinates({ lat, lng });
        setPropertyLocation( readableLoc );
        setHouseEditorProgress(houseEditorProgress + 1);
    }

    const firstStepValues = {
        images,
        mainImage,
        fileInputRef,
        errorMessage,
        croppingImage,
        isModalOpen,
        imageFile,
        originalFile
    }

    const firstStepHandlers = {
        handleImageClick,
        handleMainFileChange,
        handleImageChange,
        handleCropComplete,
        handleCancelCrop,
        handleDeleteImage,
        setCroppedMainImage,
        setIsModalOpen,
        setImageFile,
        setOriginalFile
    }

    const secondStepValues = {
        propertyName,
        propertyType,
        propertyPrice,
        propertyLocation,
        propertyDescription,
        propertyTags
    }

    const secondStepEHandlers = {
        handlePropertyNameChange,
        handlePropertyTypeChange,
        handlePropertyPriceChange,
        handlePropertyLocationChange,
        handlePropertyDescriptionChange,
        handleTagsChange
    }

    // room handlers

    return (
        <article className={Styles['house-editor__overlay']}>
            <section className={Styles['house-editor__card-container']}>
                {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={ setHouseEditorProgress } onClose={ closeHouseEditor} />}
                {houseEditorProgress === 1 && <FirstStep values={ firstStepValues } handlers={ firstStepHandlers } />}
                {houseEditorProgress === 2 && <SecondStep values={ secondStepValues } eventHandlers={ secondStepEHandlers } />}
                {houseEditorProgress === 3 && <ThirdStep readableLoc={ propertyLocation } propertyName={ propertyName } onSubmit={ onMapSubmit } />}
                {houseEditorProgress === 4 && (
                    <FourthStep
                        openRoomEditor={openRoomEditor}
                        relatedRooms={relatedRooms}
                    />
                )}
                {houseEditorProgress === 5 && <FifthStep />}

                {houseEditorProgress > 0 && (
                    <div className={Styles['house-editor__progress']}>
                        <button className={Styles['pogress__button-back']} onClick={backStep}>
                            Atrás
                        </button>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <p
                                key={i}
                                className={
                                    i < houseEditorProgress
                                        ? Styles['house-editor__progress-circle--active']
                                        : Styles['house-editor__progress-circle']
                                }
                            >
                                {i + 1}
                            </p>
                        ))}
                        {houseEditorProgress < 5 && 
                        <button className={Styles['pogress__button-next']} onClick={nextStep}>
                            Siguiente
                        </button>}
                    </div>
                )}

                <div className={Styles['house-editor__close']}>
                    <img
                        src="/Graphics/Icons/close_dark.png"
                        alt=""
                        draggable="false"
                        style={{ width: '80%', height: '80%' }}
                        onClick={closeHouseEditor}
                    />
                </div>
            </section>
        </article>
    );
};