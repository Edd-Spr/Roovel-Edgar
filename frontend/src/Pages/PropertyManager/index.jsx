import Styles from './PropertyManager.module.css';
import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import Layout from '../Layout';
import HouseEditor from '../../Components/HouseEditor';
import RoomEditor from '../../Components/RoomEditor';
import PropertyOverview from '../../Components/PropertyOverview';
import PropertyCard from './Components/PropertyCard';

const PropertyManager = () => {
  const [isHouseEditorOpen, setIsHouseEditorOpen] = useState(false);
  const [isRoomEditorOpen, setIsRoomEditorOpen] = useState(false);
  const [isPropertyOverviewOpen, setIsPropertyOverviewOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [propertys, setPropertys] = useState([
    {
      id_home: 1,
      home_owner: 1,
      home_name: 'Casa Chapultepec',
      home_on_sale: 1,
      home_all_in: 0,
      home_description: 'Casa amplia en zona céntrica, ideal para estudiantes.',
      address: 'Calle Falsa 123, Ciudad de México',
      home_ubication: [20.6736, -103.3440],
      tags: [
        { id_tag: 1, tag_content: 'Ecológico' },
        { id_tag: 2, tag_content: 'Sustentable' },
        { id_tag: 3, tag_content: 'Ahorro' },
        { id_tag: 4, tag_content: 'Decoración' },
        { id_tag: 5, tag_content: 'Minimalismo' }
      ],
      mainImage: [{ id_image: 1, image_content: '/PropertyImages/111-house.jpeg' }],
      images: [
        { id_image: 2, image_content: '/PropertyImages/112-house.jpeg' },
        { id_image: 3, image_content: '/PropertyImages/113-house.jpeg' },
        { id_image: 4, image_content: '/PropertyImages/114-house.jpeg' },
      ]
    },
    {
      id_home: 2,
      home_owner: 2,
      home_name: 'Loft Roma Norte',
      home_on_sale: 0,
      home_all_in: 1,
      home_description: 'Loft moderno con excelente iluminación natural.',
      address: 'Av. Álvaro Obregón 85, CDMX',
      home_ubication: [19.4174, -99.1626],
      tags: [
        { id_tag: 1, tag_content: 'Moderno' },
        { id_tag: 3, tag_content: 'Ahorro' },
        { id_tag: 6, tag_content: 'Conectado' }
      ],
      mainImage: [{ id_image: 1, image_content: '/PropertyImages/121-house.jpeg' }],
      images: [
        { id_image: 2, image_content: '/PropertyImages/122-house.jpg' },
        { id_image: 3, image_content: '/PropertyImages/123-house.jpeg' },
        { id_image: 4, image_content: '/PropertyImages/124-house.jpeg' },
        { id_image: 4, image_content: '/PropertyImages/125-house.jpg' },
      ]
    },
    {
      id_home: 3,
      home_owner: 3,
      home_name: 'Departamento Vista al Parque',
      home_on_sale: 1,
      home_all_in: 1,
      home_description: 'Espacio cómodo con vista privilegiada al parque central.',
      address: 'Calle del Parque 456, Guadalajara',
      home_ubication: [20.6765, -103.3476],
      tags: [
        { id_tag: 2, tag_content: 'Sustentable' },
        { id_tag: 4, tag_content: 'Decoración' },
        { id_tag: 7, tag_content: 'Pet Friendly' }
      ],
      mainImage: [{ id_image: 1, image_content: '/PropertyImages/121-room.jpeg' }],
      images: [
      ]
    }
  ]);

const [pendingRooms, setPendingRooms] = useState([
  {
    id_room: 1,
    id_home: 1,
    room_ocupied: 0,
    room_price: 4500,
    romm_description: 'Habitación con luz natural y clóset amplio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 6,
            tag_content: 'Moderno'
        },
        {
            id_tag: 7,
            tag_content: 'Luz natural'
        },
        {
            id_tag: 8,
            tag_content: 'Espacioso'
        }
    ],
    mainImage: [
        {
            id_image: 6,
            image_content: '/PropertyImages/121-room.jpeg'
        }
    ],
    images: [
        {
            id_image: 7,
            image_content: '/PropertyImages/123-room.jpeg'
        }
    ]
},
{
    id_room: 2,
    id_home: 1,
    room_ocupied: 1,
    room_price: 4700,
    romm_description: 'Cuarto amueblado con cama individual y escritorio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 9,
            tag_content: 'Minimalista'
        },
        {
            id_tag: 10,
            tag_content: 'Vista al jardín'
        },
        {
            id_tag: 11,
            tag_content: 'Silenciosa'
        }
    ],
    mainImage: [
        {
            id_image: 8,
            image_content: '/PropertyImages/123-room.jpeg'
        }
    ],
    images: [
        {
            id_image: 9,
            image_content: '/PropertyImages/122-room.jpeg'
        }
    ]
},
{
    id_room: 3,
    id_home: 1,
    room_ocupied: 0,
    room_price: 4300,
    romm_description: 'Habitación con baño compartido y vista al patio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 12,
            tag_content: 'Estilo rústico'
        },
        {
            id_tag: 13,
            tag_content: 'Techo alto'
        },
        {
            id_tag: 14,
            tag_content: 'Amueblada'
        }
    ],
    mainImage: [
        {
            id_image: 10,
            image_content: '/PropertyImages/122-room.jpeg'
        }
    ],
    images: [
        {
            id_image: 11,
            image_content: '/PropertyImages/123-room.jpeg'
        }
    ]
},
{
    id_room: 3,
    id_home: 2,
    room_ocupied: 0,
    room_price: 4300,
    romm_description: 'Habitación con baño compartido y vista al patio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
        {
            id_tag: 12,
            tag_content: 'Estilo rústico'
        },
        {
            id_tag: 13,
            tag_content: 'Techo alto'
        },
        {
            id_tag: 14,
            tag_content: 'Amueblada'
        }
    ],
    mainImage: [
        {
            id_image: 10,
            image_content: '/PropertyImages/221-room.avif'
        }
    ],
    images: [
        {
            id_image: 11,
            image_content: '/PropertyImages/222-room.jpeg',
            image_content: '/PropertyImages/223-room.jpeg',
        }
    ]
}

]);


  const handlePropertyCardClick = (property) => {
    setSelectedProperty(property);
    setIsPropertyOverviewOpen(true);
  };

  return (
    <Layout>

      <article className={Styles['property-manager__container']}>
        <DashboardSidebar
          pendingRooms={pendingRooms}
        />
        <PropertyManagerPanel 
          propertys={propertys} 
          setPropertys={setPropertys} 
          setIsHouseEditorOpen={setIsHouseEditorOpen} 
          onPropertyCardClick={handlePropertyCardClick} 
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
        />
      </article>



      {isHouseEditorOpen && (
        <HouseEditor
          closeModal={() => setIsHouseEditorOpen(false)}
          openRoomEditor={(room) => {
            setSelectedRoom(room || null);
            setIsRoomEditorOpen(true);
          }}
          closeHouseEditor={() => setIsHouseEditorOpen(false)}
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
        />
      )}

      {isRoomEditorOpen && (
        <RoomEditor
          room={selectedRoom}
          closeModal={() => setIsRoomEditorOpen(false) }
          house={selectedHouse} 
          pendingRooms={pendingRooms}
          setPendingRooms={setPendingRooms}
        />
      )}


      {isPropertyOverviewOpen && selectedProperty && (
        <PropertyOverview
          property={selectedProperty}
          rooms={pendingRooms.filter((room) => room.id_home === selectedProperty.id_home)} 
          closePropertyOverview={() => setIsPropertyOverviewOpen(false)}
        />
      )}
    </Layout>

  );
};


const DashboardSidebar = ({pendingRooms}) => {
  const [activeButton, setActiveButton] = useState('Estadisticas');

  const occupiedCount = pendingRooms.filter(r => r.room_ocupied === 1).length;
  const availableCount = pendingRooms.filter(r => r.room_ocupied === 0).length;
  const deactivatedCount = pendingRooms.filter(r => r.room_ocupied === 2).length;

  const data = [
    { name: 'Disponibles', value: availableCount },
    { name: 'Ocupadas', value: occupiedCount },
    { name: 'Desactivadas', value: deactivatedCount },
  ];

  const COLORS = ['#CBA18A', '#4A617F', '#E5DCD0'];

  return (
    <section className={Styles['dashboard-sidebar']}>
      <h2 className={Styles['property-manager__title']}>{activeButton}</h2>

      <div className={Styles['tabs__container']}>
        <button
          className={`${Styles['tabs__button']} ${activeButton === 'Estadisticas' ? Styles['tabs__button-active'] : ''}`}
          onClick={() => setActiveButton('Estadisticas')}
        >
          Estadísticas
        </button>

        <button
          className={`${Styles['tabs__button']} ${activeButton === 'Reservas' ? Styles['tabs__button-active'] : ''}`}
          onClick={() => setActiveButton('Reservas')}
        >
          Reservas
        </button>

        <button
          className={`${Styles['tabs__button']} ${activeButton === 'Mensajes' ? Styles['tabs__button-active'] : ''}`}
          onClick={() => setActiveButton('Mensajes')}
        >
          Mensajes
        </button>
      </div>

      {activeButton === 'Estadisticas' && (
        <>
          <div className={Styles['statistics__container']}style={{ display: 'flex', alignItems: 'center'}}>
            
            {/* Izquierda: leyenda personalizada */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.map((item, index) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    backgroundColor: COLORS[index]
                  }} />
                  <span className={Styles['']}>{item.name}</span>
                </div>
              ))}
            </div>

            {/* Derecha: gráfica de pastel */}
            <PieChart width={250} height={250}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className={Styles['statistics__logo-container']}>
                <img 
                  src="/Graphics/roovel-dog.png" 
                  alt="" 
                  draggable="false"
                  style={{
                    width: '100%',
                    margin: '0 auto',
                    opacity: '0.7',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  />
                  <h1 className={Styles['statistics__logo-title']}>Roovel</h1>
          </div>
        </>)}
    </section>
    
  );
};

const PropertyManagerPanel = ({propertys, setPropertys, setIsHouseEditorOpen, onPropertyCardClick, pendingRooms, setPendingRooms}) => {

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
              onClick={() => setIsHouseEditorOpen(true)}
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
              onPropertyCardClick={onPropertyCardClick} // Pasa la función al componente PropertyCard
            />
          ))
        ) : activeButton === 'Habitaciónes' ? (
          pendingRooms.map((room) => (
            console.log(room),
            <PropertyCard
              key={room.id_room}
              property={room} // Aquí `room` se pasa como `property` para reutilizar el componente
              setProperty={setPendingRooms} // Cambia el estado de habitaciones
              onPropertyCardClick={() => {
                setSelectedRoom(room); // Establece la habitación seleccionada
                setIsRoomEditorOpen(true); // Abre el RoomEditor
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

export default PropertyManager;