import React from 'react';
import { FaHome, FaRegHeart , FaComment, FaSearch, FaUserCircle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline, IoPersonOutline } from "react-icons/io5";

import './NavProfile.css';

const Menu = () => {
  return (
    <div className="menu">
      <a className="link">
        <span className="link-icon">
          <IoPersonOutline size={28} />
        </span>
        <span className="link-title">Profile</span>
      </a>

      <a className="link">
        <span className="link-icon">
          <FaRegHeart size={28} />
        </span>
        <span className="link-title">Favoritos</span>
      </a>

      <a className="link">
        <span className="link-icon">
          <AiOutlineHome size={28} />
        </span>
        <span className="link-title">Mis Cuartos</span>
      </a>

      <a className="link">
        <span className="link-icon">
          <IoSettingsOutline size={28} />
        </span>
        <span className="link-title">Configuración</span>
      </a>
    </div>
);
};

export default Menu;
