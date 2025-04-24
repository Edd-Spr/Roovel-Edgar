import React from 'react';
import './Favorite.module.css';
import NavBar from "../../Components/NavBar";


const Favoritos = () => {
//   const location = useLocation();

  return (
    <div className="Favorite">
        <NavBar />
        <h2>Favoritos</h2>
    </div>
  );
};

export default Favoritos;
