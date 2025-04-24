import React, { useState, useRef, useEffect } from 'react';
import { FiTrash2, FiSlash, FiAlertCircle, FiMoreVertical } from 'react-icons/fi';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import axios from 'axios';
import Swal from 'sweetalert2';
import './Friends.css';

const AmigosList = ({ currentUser }) => {
  const [amigos, setAmigos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAmigos = async () => {
      if (!currentUser) {
        console.error("El id del usuario no está definido");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/api/friends/${currentUser}`);
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

=======
=======
>>>>>>> Stashed changes
import './Friends.css';

const friends = [
  { name: 'Debora Melo', avatar: 'https://i.pravatar.cc/100?img=3' },
  { name: 'Mujer Seleccionada', avatar: 'https://i.pravatar.cc/100?img=4' },
];

const AmigosList = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const toggleIcons = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  // Cierra el menú si se hace clic fuera
>>>>>>> Stashed changes
=======
  // Cierra el menú si se hace clic fuera
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  const handleEliminarAmigo = (friend) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put('http://localhost:3000/api/friends/remove', {
            id_user: currentUser,
            friend: friend.id_user
          });

          setAmigos((prevAmigos) => prevAmigos.filter(f => f.id_user !== friend.id_user));

          Swal.fire({
            title: "Eliminado",
            text: "El amigo ha sido eliminado.",
            icon: "success"
          });
        } catch (error) {
          console.error('Error al eliminar al amigo:', error);
          Swal.fire("Error", "No se pudo eliminar el amigo.", "error");
        }
      }
    });
  };
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return (
    <div className="amigos-container" ref={containerRef}>
      <ul className="amigos-list">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
        {friends.map((friend, index) => (
          <li key={index} className={`amigos-item ${activeIndex === index ? 'active' : ''}`}>
            {activeIndex !== index && (
              <div className="amigos-main">
                <div className="amigo-info">
                  <img src={friend.avatar} alt={friend.name} className="amigos-avatar" />
                  <span className="amigos-name">{friend.name}</span>
                </div>
                <button className="dots-button" onClick={() => toggleIcons(index)}>
                  <FiMoreVertical size={18} />
                </button>
              </div>
            )}

            {activeIndex === index && (
              <div className="amigos-icons-row">
                <img src={friend.avatar} alt={friend.name} className="amigos-avatar" />
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
        ))}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      </ul>
    </div>
  );
};

export default AmigosList;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
export default AmigosList;
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
