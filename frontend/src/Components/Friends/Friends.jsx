import React, { useState, useRef, useEffect } from 'react';
import { FiTrash2, FiSlash, FiAlertCircle, FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';
import './Friends.css';


const AmigosList = ({ currentUserId }) => {
  const [amigos, setAmigos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);  // Se asegura que activeIndex esté definido
  const containerRef = useRef(null); // Refiere el contenedor para detectar clics fuera

  // Obtiene los amigos desde el backend
  useEffect(() => {
    const fetchAmigos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/friends/${currentUserId}`);
        setAmigos(response.data);
      } catch (error) {
        console.error('Error al cargar los amigos:', error);
      }
    };

    fetchAmigos();
  }, [currentUserId]);

  // Función para alternar el estado de los íconos (mostrar/ocultar)
  const toggleIcons = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Cerrar el menú de acciones al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="amigos-container" ref={containerRef}>
      <ul className="amigos-list">
        {amigos.length === 0 ? (
          <p>No tienes amigos todavía 🥲</p>
        ) : (
          amigos.map((friend, index) => (
            <li key={friend.id_user} className={`amigos-item ${activeIndex === index ? 'active' : ''}`}>
              {activeIndex !== index && (
                <div className="amigos-main">
                  <div className="amigo-info">
                    <img src={friend.avatar || 'https://i.pravatar.cc/100?img=3'} alt={friend.name} className="amigos-avatar" />
                    <span className="amigos-name">{friend.user_name} {friend.user_parent_name} {friend.user_last_name}</span>
                  </div>
                  <button className="dots-button" onClick={() => toggleIcons(index)}>
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              )}

              {activeIndex === index && (
                <div className="amigos-icons-row">
                  <img src={friend.avatar || 'https://i.pravatar.cc/100?img=3'} alt={friend.name} className="amigos-avatar" />
                  <div className="amigos-icons">
                    <button className="action red">
                      <FiSlash size={20} />
                    </button>
                    <button className="action yellow">
                      <FiAlertCircle size={20} />
                    </button>
                    <button className="action grey">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AmigosList;
