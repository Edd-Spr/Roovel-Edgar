import React, { useState, useRef, useEffect } from 'react';
import { FiTrash2, FiSlash, FiAlertCircle, FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';
import './Friends.css';

// const currentUser = '8'; // este es el id del usuario logueado

const AmigosList = ({ currentUser }) => {
  const [amigos, setAmigos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  // Obtener amigos
  useEffect(() => {
    const fetchAmigos = async () => {
      if (!currentUser) {
        console.error("El id del usuario no está definido");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/api/friends/${currentUser}`);
        console.log('Amigos obtenidos:', response.data);
        if (Array.isArray(response.data)) {
          setAmigos(response.data);
        } else {
          console.error('La respuesta no es un array:', response.data);
        }
      } catch (error) {
        console.error('Error al cargar los amigos:', error);
      }
    };

    fetchAmigos();
  }, [currentUser]);

  const toggleIcons = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  // Función para eliminar al amigo
  const handleEliminarAmigo = async (friend) => {
    try {
      await axios.put('http://localhost:3000/api/friends/remove', {
        id_user: currentUser,  // Este es el id del usuario logueado
        friend: friend.id_user  // Deberías enviar friend.id_user, ya que friend es el objeto que contiene el id
      });
      // Filtrar al amigo eliminado de la lista
      setAmigos((prevAmigos) => prevAmigos.filter(f => f.id_user !== friend.id_user)); // Filtra correctamente
    } catch (error) {
      console.error('Error al eliminar al amigo:', error);
    }
  };

  return (
    <div className="amigos-container" ref={containerRef}>
      <ul className="amigos-list">
        {amigos.length === 0 ? (
          <p>No tienes amigos todavía 🥲</p>
        ) : (
          amigos.map((friend, index) => (
            <li key={friend.id_user} className={`amigos-item ${activeIndex === index ? 'active' : ''}`}>
              {activeIndex !== index ? (
                <div className="amigos-main">
                  <div className="amigo-info">
                    <img src={friend.avatar || 'https://i.pravatar.cc/100?img=3'} alt={friend.name} className="amigos-avatar" />
                    <span className="amigos-name">
                      {friend.user_name} {friend.user_parent_name} {friend.user_last_name}
                    </span>
                  </div>
                  <button className="dots-button" onClick={() => toggleIcons(index)}>
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              ) : (
                <div className="amigos-icons-row">
                  <img src={friend.avatar || 'https://i.pravatar.cc/100?img=3'} alt={friend.name} className="amigos-avatar" />
                  <div className="amigos-icons">
                    <button className="action red">
                      <FiSlash size={20} />
                    </button>
                    <button className="action yellow">
                      <FiAlertCircle size={20} />
                    </button>
                    <button className="action grey" onClick={() => handleEliminarAmigo(friend)}>
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
