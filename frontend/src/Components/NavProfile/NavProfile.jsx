import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline, IoPersonOutline } from "react-icons/io5";

import './NavProfile.css';

const Menu = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Profile', icon: <IoPersonOutline size={28} />, path: '/profile' },
    { label: 'Favoritos', icon: <FaRegHeart size={28} />, path: '/favoritos' },
    { label: 'Mis Cuartos', icon: <AiOutlineHome size={28} />, path: '/cuartos' },
    { label: 'Configuración', icon: <IoSettingsOutline size={28} />, path: '/configuracion' },
  ];

  return (
    <div className="menu">
      {navItems.map((item) => (
        <Link
          to={item.path}
          key={item.path}
          className={`link ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className={`link-icon ${location.pathname === item.path ? 'active-icon' : ''}`}>
            {item.icon}
          </span>
          <span className="link-title">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
