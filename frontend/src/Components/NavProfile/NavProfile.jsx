import React from 'react';
import { useLocation, Link } from 'react-router-dom';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { FiHeart, FiUser, FiHome, FiSettings } from "react-icons/fi";
=======
=======
>>>>>>> Stashed changes
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline, IoPersonOutline } from "react-icons/io5";
>>>>>>> Stashed changes

import './NavProfile.css';

const Menu = () => {
  const location = useLocation();

  const navItems = [
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    { label: 'Profile', icon: <FiUser size={28} />, path: '/profile' },
    { label: 'Favoritos', icon: <FiHeart size={28} />, path: '/favoritos' },
    { label: 'Mis Cuartos', icon: <FiHome  size={28} />, path: '/cuartos' },
    { label: 'Configuración', icon: <FiSettings size={28} />, path: '/configuracion' },
=======
=======
>>>>>>> Stashed changes
    { label: 'Profile', icon: <IoPersonOutline size={28} />, path: '/profile' },
    { label: 'Favoritos', icon: <FaRegHeart size={28} />, path: '/favoritos' },
    { label: 'Mis Cuartos', icon: <AiOutlineHome size={28} />, path: '/cuartos' },
    { label: 'Configuración', icon: <IoSettingsOutline size={28} />, path: '/configuracion' },
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
    </div>
  );
>>>>>>> Stashed changes
=======
    </div>
  );
>>>>>>> Stashed changes
};

export default Menu;
