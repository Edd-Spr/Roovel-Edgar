import { color } from 'framer-motion';
import Styles from './FilterButton.module.css'
import { useState } from 'react';
import Slider from 'react-slider'



const FilterButton = ({ valueInput, setValueInput, options, radius, height, buttonType, rangeValues, setRangeValues, modalPlace}) => {

    const extraStyles = {
        borderRadius: radius,
        height: height,
    };

    function handleValueChange(event) {
        setValueInput(event.target.selectedIndex);
    }

    if (buttonType === 'multirange') {
        return(<MultiRange/>)
    }else{
        return (
            <div className={Styles.inputButtonContainer} style={extraStyles}>
                <select 
                    value={valueInput} 
                    style={{borderRadius: radius, height: height}}
                    onChange={handleValueChange} 
                    className={`${valueInput > 0 && Styles.activeButton} ${Styles.buttonStyle}`}>
                    {options.map((value, index) => (
                        <option key={index} value={index} className={Styles.optionStyle}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
    function MultiRange() {
        const [tempRangeValues, setTempRangeValues] = useState([1000, 16000]);
        const [isActive, setIsActive] = useState(false);
        const MIN = 1000;
        const MAX = 16000;

        const activeButton = {
            backgroundColor: '#B2C9CE',
            color: 'white',
        }

        function handleOverlayClick() {
          setIsActive((prev) => !prev);
          tempRangeValues([...rangeValues])
        }
        function setNewRange() {
            setRangeValues([...tempRangeValues]); 
            setIsActive(false);
        }
        return (
          <>
            <div
              className={`${Styles.overlay} ${!isActive ? Styles.hideOverlay : ""}`}
              onClick={handleOverlayClick}
            ></div>
      
            <div className={Styles.inputButtonContainer}>
              <div className={`${Styles.modalRange} ${!isActive ? Styles.hideOverlay : ""}`} style={modalPlace >= 1 ? {bottom: '-12.5rem'} : {top: '-12.5rem'}}>
                <h1>Establecer rango de precios</h1>
                <p>{`${tempRangeValues[0]} - ${tempRangeValues[1]}`}</p>
      
                <Slider
                  className={Styles.rangeSlider}
                  value={tempRangeValues}
                  onChange={(values) => {
                    if (values[0] !== values[1]) setTempRangeValues(values); 
                  }}
                  min={MIN}
                  max={MAX}
                  minDistance={0} 
                  renderTrack={(props, state) => {
                    const { key, ...restProps } = props;
                    let trackClass =
                      state.index === 1 ? Styles.middleTrack : Styles.track;
                    return <div key={key} {...restProps} className={trackClass} />;
                  }}
                  renderThumb={(props, state) => {
                    const { key, ...restProps } = props;
                    return (
                      <div
                        key={key}
                        {...restProps}
                        className={`${Styles.thumb} ${
                          state.index === 0 ? Styles.thumbLeft : Styles.thumbRight
                        }`}
                      />
                    );
                  }}
                />
      
                <button onClick={setNewRange}>Aplicar</button>
              </div>
      
              <button 
                className={Styles.buttonStyle} 
                onClick={handleOverlayClick} 
                style={{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    width: '9rem',
                    ...(isActive && {backgroundColor: '#f0f0f0'}),
                    ...(rangeValues[0] !== MIN || rangeValues[1] !== MAX ? activeButton : {})
                  }}
                >
                {rangeValues[0]==MIN && rangeValues[1] == MAX ? 'Todos los precios' : `${rangeValues[0]} - ${rangeValues[1]} MXN`}
              </button>
            </div>
          </>
        );
      }
      
      
}


export default FilterButton;