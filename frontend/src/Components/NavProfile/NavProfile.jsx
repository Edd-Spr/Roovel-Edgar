import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHeart, FiUser, FiHome, FiSettings } from "react-icons/fi";

import './NavProfile.css';

const Menu = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Profile', icon: <FiUser size={28} />, path: '/profile' },
    { label: 'Favoritos', icon: <FiHeart size={28} />, path: '/favoritos' },
    { label: 'Mis Cuartos', icon: <FiHome  size={28} />, path: '/cuartos' },
    { label: 'Configuración', icon: <FiSettings size={28} />, path: '/configuracion' },
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
  );
};

export default Menu;
