import React, { useState } from 'react';
import Styles from './DashboardSidebar.module.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
          className={`${Styles['tabs__button']} ${activeButton === 'Huespedes' ? Styles['tabs__button-active'] : ''}`}
          onClick={() => setActiveButton('Huespedes')}
        >
          Huespedes
        </button>

        <button
          className={`${Styles['tabs__button']} ${activeButton === 'Solicitudes' ? Styles['tabs__button-active'] : ''}`}
          onClick={() => setActiveButton('Solicitudes')}
        >
          Solicitudes
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
                    height: '100%',
                    objectFit: 'cover',
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

export default DashboardSidebar;