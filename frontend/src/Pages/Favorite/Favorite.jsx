import React from 'react';
import fav from './Favorite.module.css';
import NavBar from "../../Components/NavBar";
import NavProfile from '../../Components/NavProfile/NavProfile';
import FavoriteCard from '../../Components/FavoriteRoom/FavoriteRoom'


const Favoritos = () => {
//   const location = useLocation();

  return (
    <div>
        <NavBar />
        <div className={fav.Favorite}>
            <article className={fav.left}>
                <h1>left</h1>
                <NavProfile />
            </article>

            <article className={fav.center}>
                <h2>center</h2>
                <FavoriteCard
                    titulo="Depto en Chapultepec"
                    descripcion="Con excelente iluminación y a 5 min del tren ligero."
                    imagen=""
                    etiquetas={['Amueblado', 'Pet Friendly', 'Estudiante']}
                />

            </article>
        
            
        </div>
    </div>
  );
};

export default Favoritos;
