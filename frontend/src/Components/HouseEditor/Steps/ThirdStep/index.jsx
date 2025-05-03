import Styles from './ThirdStep.module.css';
import CustomMap from '../../../../Pages/Map/Components/CustomMap';
import MapForm from '../../../../Pages/Map/Components/MapForm';
import { motion } from 'framer-motion';

const inputPlaceholder = 'Ubicación';
const submitMessage = 'Buscar';

import useThird from './useThird';

export default function ThirdStep({ readableLoc, onSubmit, propertyName }) {
  const {
    position, 
    readableDirection, 
    dirTyped,
    possiblePlaces,
    searched,
    SetViewOnUpdate, 
    MapLocator,
    onPositionUpdate,
    onOptionSelected,
    onSubmit: onUseSubmit,
    eventHandlers
  } = useThird( readableLoc );

  const onLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, { lat: position[0], lng: position[1], readableLoc: readableDirection });
  }

  return (
  <motion.article
    style={{
      width: '70vw',
      height: '80vh',
      display: 'flex',
      position: 'relative',
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <MapForm 
      onSubmit={ onUseSubmit } 
      searchBarValue={ dirTyped }
      onSearchBarUpdate={ onPositionUpdate }
      options={ possiblePlaces }
      alreadySelected={ searched }
      onOptionSelected={ onOptionSelected }
      inputPlaceholder={ ( typeof( readableDirection ) === 'string' ) ? readableDirection : inputPlaceholder } 
      submitMessage={ submitMessage }
    />
    <CustomMap 
      className={ Styles[`modal__map`] }	
      position={ position } 
      MapLocator={ MapLocator } 
      readableDirection={ readableDirection }
      eventHandlers={ eventHandlers }
      SetViewOnUpdate={ SetViewOnUpdate }
    ></CustomMap>

    {
      ( position && readableDirection ) && (
        <section title='Asegurate de que tu propiedad sea la que se muestra en el mapa' className={ Styles['modal__card'] }>
          <h1 className={ Styles['modal__card-title'] }>{ propertyName || 'Propiedad' }</h1>
          <p className={ Styles['modal__card-text'] }>{ readableDirection }</p>
          <button 
            className={ Styles['modal__card-button'] }
            onClick={ onLocalSubmit }
          >Guardar</button>
        </section>
      )
    }
  </motion.article>
  )
}