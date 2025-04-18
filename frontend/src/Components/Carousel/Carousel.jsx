import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carousel.css';

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = '8'; // ID del usuario

  // Cargar imágenes desde el backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/images?id_user=${currentUser}`);
        console.log('Imágenes recibidas del backend:', response.data);
        setImages(response.data);
      } catch (error) {
        console.error('Error al traer imágenes:', error);
      }
    };

    fetchImages();
  }, []);

  // Función para ir a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Si llega al final, regresa a la primera imagen
  };

  // Función para ir a la imagen anterior
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length // Si está en la primera, va a la última imagen
    );
  };

  // Calcular el progreso
  const progress = ((currentIndex + 1) / images.length) * 100;

  return (
    <div className="carousel-container">
      {images.length > 0 ? (
        <div
          className="carousel-content"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Mueve el carrusel para mostrar la imagen actual
            transition: 'transform 0.5s ease', // Transición suave al cambio de imagen
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-image">
              <img src={image.image_content} alt={`carousel-img-${index}`} />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay imágenes disponibles</p>
      )}
      <button className="prev-button" onClick={prevImage}>
        &#10094;
      </button>
      <button className="next-button" onClick={nextImage}>
        &#10095;
      </button>

      {/* Barra de progreso */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }} // Asigna el progreso basado en currentIndex
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
