import { useState, useEffect } from 'react';
import Styles from './HouseEditor.module.css';

// Steps
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import FourthStep from './Steps/FourthStep';
import FifthStep from './Steps/FifthStep';

const HouseEditor = ({ property, openRoomEditor, relatedRooms, setPendingRooms, closeHouseEditor }) => {
    const [houseEditorProgress, setHouseEditorProgress] = useState(0);

    // serialized cropped images
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState();

    // second step
    const [propertyName, setPropertyName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyPrice, setPropertyPrice] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertyDescription, setPropertyDescription] = useState('');
    const [propertyTags, setPropertyTags] = useState([]);

    // third step
    const [ propertyCoordinates, setPropertyCoordinates ] = useState({
        lat: null,
        lng: null
    });

    const [temporaryRooms, setTemporaryRooms] = useState([]);

    // Determina si estás editando o creando una casa
    const isEditing = !!property;

    // Cargar datos iniciales en caso de edición
    useEffect(() => {
        if (isEditing) {
            // Si estás editando, carga los datos de la propiedad en los estados
            setImages(property.images || []);
            setTemporaryRooms(relatedRooms || []);
        } else {
            // Si estás creando, inicializa los estados vacíos
            setImages([]);
            setTemporaryRooms([]);
        }
    }, [property, isEditing, relatedRooms]);

    const allImageFiles = {
        images,
        setImages,
        mainImage,
        setMainImage
    };

    function backStep() {
        if (houseEditorProgress > 0)
            setHouseEditorProgress(houseEditorProgress - 1);
    };

    function nextStep() {
        if (houseEditorProgress < 5) 
            setHouseEditorProgress(houseEditorProgress + 1);
    };

    function handlePropertyNameChange(e) {
        setPropertyName(e.target.value);
    }

    function handlePropertyTypeChange(e) {
        setPropertyType(e.target.value);
    }

    function handlePropertyPriceChange(e) {
        setPropertyPrice(e.target.value);
    }

    function handlePropertyLocationChange(e) {
        setPropertyLocation(e.target.value);
    }

    function handlePropertyDescriptionChange(e) {
        setPropertyDescription(e.target.value);
    }

    function handleTagsChange(e) {
        e.preventDefault();
        const tagValue = e.target.value;

        setPropertyTags((prev) =>
            prev.includes(tagValue) ? prev.filter((n) => n !== tagValue) : [...prev, tagValue]
        );
    }

    function handleCoordinatesChange(coordinates, readableLoc) {
        setPropertyCoordinates( coordinates );
        setPropertyLocation( readableLoc );
    }

    function onMapSubmit(e, data) {
        e.preventDefault();
        const { lat, lng, readableLoc } = data;
        setPropertyCoordinates({ lat, lng });
        setPropertyLocation( readableLoc );
        setHouseEditorProgress(houseEditorProgress + 1);
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

    return (
        <article className={Styles['house-editor__overlay']}>
            <section className={Styles['house-editor__card-container']}>
                {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={setHouseEditorProgress} />}
                {houseEditorProgress === 1 && <FirstStep allImageFiles={allImageFiles} />}
                {houseEditorProgress === 2 && <SecondStep values={ secondStepValues } eventHandlers={ secondStepEHandlers } />}
                {houseEditorProgress === 3 && <ThirdStep readableLoc={ propertyLocation } propertyName={ propertyName } onCoordinatesChange={ handleCoordinatesChange } onSubmit={ onMapSubmit } />}
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

export default HouseEditor;