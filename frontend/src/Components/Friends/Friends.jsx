import React, { useState, useRef, useEffect } from 'react';
import { FiTrash2, FiSlash, FiAlertCircle, FiMoreVertical } from 'react-icons/fi';
import './Friends.css';

const friends = [
  { name: 'Debora ', avatar: 'https://i.pravatar.cc/100?img=3' },
  { name: 'Mujer Seleccionada', avatar: 'https://i.pravatar.cc/100?img=4' },
];

const AmigosList = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

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

  return (
    <div className="amigos-container" ref={containerRef}>
      <ul className="amigos-list">
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
      </ul>
    </div>
    
  );
};

export default AmigosList;
