import { useState } from 'react';
import { motion } from 'framer-motion';
import Styles from './HouseEditor.module.css';

//Steps ------------------------------------------------
import StartStep from './Steps/StartStep';
import FirstStep from './Steps/FirstStep';

const HouseEditor = () => {
    const [houseEditorProgress, setHouseEditorProgress] = useState(0);
  return (
    <article className={ Styles['house-editor__overlay'] }>
      <section className={ Styles['house-editor__card-container'] }>
        {houseEditorProgress === 0 && <StartStep setHouseEditorProgress={setHouseEditorProgress}/>}
        {houseEditorProgress === 1 && <FirstStep setHouseEditorProgress={setHouseEditorProgress}/>}

        <div className={Styles['house-editor__progress']}>
            {
            houseEditorProgress > 0 && houseEditorProgress !== 3 && 
            Array.from({ length: 3 }).map((_, i) => (
                <p 
                    key={i}
                    className={
                        i < houseEditorProgress
                        ? Styles['house-editor__progress-circle--active']
                        : Styles['house-editor__progress-circle']
                    }
                    >
                    {i+1}
                </p>
            ))
            }
        </div>
      </section>
    </article>
  );
}
export default HouseEditor;