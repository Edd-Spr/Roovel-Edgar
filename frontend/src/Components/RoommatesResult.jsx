import SearchFilter from '../Components/SearchFilter.jsx'
import MatchProfileBox from './MatchProfileBox.jsx';

const styleRoommatesContainer = {
  width: '80vw', 
  height: '92vh', 
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'center',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  overflow: 'scroll'

}
const styleRoommatesResult = {
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  
  }
  const RoommatesResult = () =>{
    return (
      <div style={styleRoommatesContainer}>
        <div style={styleRoommatesResult}>
          <SearchFilter/>
          {perfilesRoomies.map(() => <MatchProfileBox/>)}
        </div>
        
      </div>
    );
  }

  export default RoommatesResult;
  const perfilesRoomies = [
    {
      id: 101,
      imagen: "https://randomuser.me/api/portraits/men/1.jpg",
      nombre: "Carlos Ramírez",
      edad: 25,
      busca_habitacion_en: "Guadalajara Centro, Jalisco",
      petfriendly: true
    },
    {
      id: 102,
      imagen: "https://randomuser.me/api/portraits/women/2.jpg",
      nombre: "Andrea López",
      edad: 22,
      busca_habitacion_en: "Zapopan, Jalisco",
      petfriendly: false
    },
    {
      id: 103,
      imagen: "https://randomuser.me/api/portraits/men/3.jpg",
      nombre: "Luis Fernández",
      edad: 28,
      busca_habitacion_en: "El Salto, Jalisco",
      petfriendly: true
    },
    {
      id: 104,
      imagen: "https://randomuser.me/api/portraits/women/4.jpg",
      nombre: "Mariana Torres",
      edad: 24,
      busca_habitacion_en: "Tonalá, Jalisco",
      petfriendly: false
    },
    {
      id: 105,
      imagen: "https://randomuser.me/api/portraits/men/5.jpg",
      nombre: "Fernando Morales",
      edad: 30,
      busca_habitacion_en: "Tlajomulco de Zúñiga, Jalisco",
      petfriendly: true
    },
    {
      id: 106,
      imagen: "https://randomuser.me/api/portraits/women/6.jpg",
      nombre: "Gabriela Estrada",
      edad: 26,
      busca_habitacion_en: "Tlaquepaque, Jalisco",
      petfriendly: false
    },
    {
      id: 107,
      imagen: "https://randomuser.me/api/portraits/men/7.jpg",
      nombre: "Juan Pérez",
      edad: 29,
      busca_habitacion_en: "Tlajomulco, Jalisco",
      petfriendly: true
    },
    {
      id: 108,
      imagen: "https://randomuser.me/api/portraits/women/8.jpg",
      nombre: "Sofía Gómez",
      edad: 27,
      busca_habitacion_en: "Guadalajara, Jalisco",
      petfriendly: false
    },
    {
      id: 109,
      imagen: "https://randomuser.me/api/portraits/men/9.jpg",
      nombre: "Miguel Álvarez",
      edad: 32,
      busca_habitacion_en: "Zapopan, Jalisco",
      petfriendly: true
    }
  ];
  