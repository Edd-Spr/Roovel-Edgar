import { useState } from 'react';
import Styles from './HouseEditor.module.css';

// Steps
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import FourthStep from './Steps/FourthStep';
import FifthStep from './Steps/FifthStep';

const HouseEditor = ({ openRoomEditor, pendingRooms, setPendingRooms }) => {
    const [houseEditorProgress, setHouseEditorProgress] = useState(4);

    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [croppedMainImage, setCroppedMainImage] = useState(null);



    const allImageFiles = {
        images,
        imageFiles,
        setImages,
        setImageFiles,
        imageFile,
        setImageFile,
        croppedMainImage,
        setCroppedMainImage,
    };

    const back = () => {
        if (houseEditorProgress > 0) {
            setHouseEditorProgress(houseEditorProgress - 1);
        }
    };

    const next = () => {
        if (houseEditorProgress < 5) {
            setHouseEditorProgress(houseEditorProgress + 1);
        }
    };

    return (
        <article className={Styles['house-editor__overlay']}>
            <section className={Styles['house-editor__card-container']}>
                {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={setHouseEditorProgress} />}
                {houseEditorProgress === 1 && <FirstStep allImageFiles={allImageFiles} />}
                {houseEditorProgress === 2 && <SecondStep />}
                {houseEditorProgress === 3 && <ThirdStep />}
                {houseEditorProgress === 4 && (
                    <FourthStep
                        pendingRooms={pendingRooms}
                        setPendingRooms={setPendingRooms}
                        setHouseEditorProgress={setHouseEditorProgress}
                        openRoomEditor={openRoomEditor} // Nueva prop para abrir el RoomEditor desde PropiedadesPage
                    />
                )}
                {houseEditorProgress === 5 && <FifthStep />}

                {houseEditorProgress > 0 && (
                    <div className={Styles['house-editor__progress']}>
                        <button className={Styles['pogress__button-back']} onClick={back}>
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
                        <button className={Styles['pogress__button-next']} onClick={next}>
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
                        onClick={() => {
                            setHouseEditorProgress(0);
                        }}
                    />
                </div>
            </section>
        </article>
    );
};

export default HouseEditor;