import React, { useEffect, useState } from 'react';
import fav from './Favorite.module.css';
import NavBar from "../../Components/NavBar";
import NavProfile from '../../Components/NavProfile/NavProfile';
import FavoriteCard from '../../Components/FavoriteRoom/FavoriteRoom';
import axios from 'axios';
import dog from '../../Components/Friends/dog_waiting.jpg';
import { FaHeart } from "react-icons/fa";

import { useAuth } from '../../hooks/auth';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const userId = 41;

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/favorito?userId=${userId}`);
        setFavoritos(response.data);
      } catch (error) {
        console.error('Error al traer favoritos:', error);
      }
    };

    fetchFavoritos();
  }, [userId]);
const { redirectBasedOnRole } = useAuth();
  useEffect(()=>{
    const condition = ({ typeuser }) => typeuser === 0;
    const action = () => {
      Swal.fire({
        title: 'Error',
        text: 'No tienes permisos para acceder a esta página.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    redirectBasedOnRole('/auth', condition, action);
  }, [])

  return (
    <div>
      <NavBar />
      <div className={fav.Favorite}>
        <article className={fav.left}>
          <NavProfile />
        </article>

        <article className={fav.center}>
            <div className={fav.favCont}>
                <h2>Habitaciones Favorias</h2>
                <div className={fav.roomFavs}>
                {favoritos.length === 0 ? (
                    <div className='sinAmigos'>
                                <img src= {dog} />
                                <span>No tienes amigos todavía</span>
                                </div>
                ) : (
                    favoritos.map((room) => (
                    <FavoriteCard
                        key={room.id_room}
                        // titulo={room.room_title}
                        descripcion={room.room_description}
                        imagen={"https://hips.hearstapps.com/hmg-prod/images/piso-familiar-coleccionsita-arte-sao-paulo-dormitorio-alfombras-superpuestas-1543243868.jpg"}
                        etiquetas={['Amueblado', 'Pet Friendly', 'Estudiante']} // Puedes reemplazar esto con etiquetas reales si las tienes
                    />
                    ))
                )}
                </div>
            </div>
        </article>
      </div>
    </div>
  );
};

export default Favoritos;
