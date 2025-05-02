import Styles from './PropertyManagerPanel.module.css';
import { useState } from 'react';
import PropertyCard from '../PropertyCard';

const PropertyManagerPanel = ({
    propertys, 
    setPropertys, 
    setIsHouseEditorOpen, 
    onPropertyCardClick, 
    pendingRooms, 
    setPendingRooms, 
    setSelectedRoom, 
    setIsRoomOverviewOpen,
    openHouseEditor,
    setSelectedHouse,
  
  }) => {

    const [activeButton, setActiveButton] = useState('Casas');
    return (
      <section className={Styles['property-manager-panel']}>
        <h2 className={Styles['property-manager__title']}>Gestor de propiedades</h2>
        <div className={Styles['tabs__container']}>
          <button
            className={`${Styles['tabs__button']} ${activeButton === 'Casas' ? Styles['tabs__button-active'] : ''}`}
            onClick={() => setActiveButton('Casas')}
          >
            Casas
          </button>
  
          <button
            className={`${Styles['tabs__button']} ${activeButton === 'Habitaciónes' ? Styles['tabs__button-active'] : ''}`}
            onClick={() => setActiveButton('Habitaciónes')}
          >
            Habitaciónes
          </button>
  
          <button
            className={`${Styles['tabs__button']} ${activeButton === 'Disponibles' ? Styles['tabs__button-active'] : ''}`}
            onClick={() => setActiveButton('Disponibles')}
          >
            Disponibles
          </button>
  
          <button
            className={`${Styles['tabs__button']} ${activeButton === 'Ocupadas' ? Styles['tabs__button-active'] : ''}`}
            onClick={() => setActiveButton('Ocupadas')}
          >
            Ocupadas
          </button>
  
          <button
            className={`${Styles['tabs__button']} ${activeButton === 'Desactivadas' ? Styles['tabs__button-active'] : ''}`}
            onClick={() => setActiveButton('Desactivadas')}
          >
            Desactivadas
          </button>
        </div>
  
        <div className={Styles['property-manager__content']}>
          <div className={Styles['property-manager__content-title']}>
            <h2 className={Styles['property-manager__title']}>{activeButton}</h2>
            {activeButton === 'Casas' && (
              <button
                className={Styles['property-manager__button-add-property']}
                onClick={() => {
                  setIsHouseEditorOpen(true)
                  setSelectedHouse(null);
                }}
              >
                + Crear Propiedad
              </button>
            )}
          </div>
  
          {activeButton === 'Casas' ? (
            propertys.map((property) => (
              <PropertyCard
                key={property.id_home}
                property={property}
                setProperty={setPropertys}
                onPropertyCardClick={onPropertyCardClick} 
                openHouseEditor={openHouseEditor}
              />
            ))
          ) : activeButton === 'Habitaciónes' ? (
            pendingRooms.map((room, index) => (
              <PropertyCard
                key={`${room.id_room}-${index}`}
                property={room}
                setProperty={setPendingRooms}
                onPropertyCardClick={() => {
                  setSelectedRoom(room);
                  setIsRoomOverviewOpen(true);
                }}
              />
            ))
          ) : (
            <div className={Styles['empty-screen']}>
              <img 
                src="/Graphics/Icons/empty-screen_icon-dog.png" 
                alt="" 
                draggable="false"
                style={{
                  width: '10rem',
                  margin: '0 auto',
                  opacity: '0.3',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
              <p className={Styles['property-manager__message']}>No hay elementos para mostrar.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  export default PropertyManagerPanel;