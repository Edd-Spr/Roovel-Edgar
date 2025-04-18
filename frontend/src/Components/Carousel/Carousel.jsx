import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carousel.css';

const Carousel = () => {
  const [images, setImages] = useState([]);
  const currentUser = '8'; // id user

  useEffect(() => {

    const fetchImages = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/profile?currentUser=${currentUser}`);
        console.log('Datos recibidos:', response.data); 
        setImages(response.data);  
      } catch (error) {
        console.error('Error al traer imágenes', error); 
      }
    };

    fetchImages(); 
  }, []); 

  return (
    <div className="carousel-container">
      {images.length > 0 ? (
        <div className="carousel-content">
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.image_content} alt={`carousel-img-${index}`} />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay imágenes disponibles</p>
      )}
    </div>
  );
};

export default Carousel;
