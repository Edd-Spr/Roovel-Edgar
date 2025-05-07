import { useState } from 'react';
import Styles from './RoomEditor.module.css';

//Steps ------------------------------------------------
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
// -----------------------------------------------------

export default function RoomEditor({ firstStepValues, firstStepHandlers, secondStepValues, secondStepHandlers, closeModal, onSubmit }) {
  const [houseEditorProgress, setHouseEditorProgress] = useState(0);

  const onDecoratedSubmit = () => {
    closeModal();
    onSubmit();
  }

  return (
    <article className={Styles['house-editor__overlay']}>
      <section className={Styles['house-editor__card-container']}>

        {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={setHouseEditorProgress} />}
        {houseEditorProgress === 1 && (
          <FirstStep values={ firstStepValues } handlers={ firstStepHandlers } />
        )}
        {houseEditorProgress === 2 && (
          <SecondStep values={ secondStepValues } handlers={ secondStepHandlers } />
        )}
        {houseEditorProgress === 3 && (
          <ThirdStep onSubmit={ onDecoratedSubmit } />
        )}

        {/* Navegación entre pasos */}
        {houseEditorProgress > 0 && (
          <div className={Styles['house-editor__progress']}>
            <button className={Styles['pogress__button-back']} onClick={() => setHouseEditorProgress(houseEditorProgress - 1)}>
              Atrás
            </button>
            {houseEditorProgress < 3 && (
              <button className={Styles['pogress__button-next']} onClick={() => setHouseEditorProgress(houseEditorProgress + 1)}>
                Siguiente
              </button>
            )}
          </div>
        )}

        {/* Botón de cerrar */}
        <div className={Styles['house-editor__close']}>
          <img
            src="/Graphics/Icons/close_dark.png"
            alt="Cerrar"
            draggable="false"
            style={{ width: '80%', height: '80%' }}
            onClick={closeModal}
          />
        </div>

      </section>
    </article>
  );
};