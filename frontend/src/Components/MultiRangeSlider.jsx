import { useState } from 'react';
import '../Styles/MultiRangeSlider.css'
import MultiRangeSlider from "multi-range-slider-react";

const MultiRange = ({minValue, maxValue, set_minValue, set_maxValue, min, max, actualValue, setActualValue}) => {

    function handleInput(e){
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
    
    function handleValuesInput(){
        set_minValue(min);
        set_maxValue(max);
        setActualValue(!actualValue);
    }

    return (
        <div className="multiRangeContainer">
            { actualValue ? 
                <>
                    <MultiRangeSlider
                        min={17}
                        max={60}
                        step={2}
                        minValue={minValue}
                        maxValue={maxValue}
                        barInnerColor='#B2C9CE'
                        ruler={false}
                        label={false}  // Deshabilitar las etiquetas automáticas de MultiRangeSlider
                        onChange={(e) => handleInput(e)}
                    /> 
                    <label htmlFor="" className="labelRange" style={{left: '10px'}}>{minValue}</label>
                    <label htmlFor="" className="labelRange" style={{right: '10px'}}>{maxValue}</label>
                    <button className='backButton' onClick={handleValuesInput}>Todas las Edades</button>
                </>
                : 
                <label htmlFor="" className='labelStyle' onClick={handleValuesInput}>Todas las Edades</label>
            }
        </div>
    );
};

export default MultiRange;