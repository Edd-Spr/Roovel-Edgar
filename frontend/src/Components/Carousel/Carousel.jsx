import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carousel.css';

const Carousel = ({currentUser}) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentUser)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        if(currentUser == 0){
          console.log('Await for value diferent 0')
        }
        const response = await axios.get(`http://localhost:3000/images?id_user=${currentUser}`);
        console.log('Imágenes recibidas del backend:', response.data);
        setImages(response.data);
      } catch (error) {
        console.error('Error al traer imágenes:', error);
      }
    };

    if(currentUser) fetchImages();
  }, [currentUser]);
console.log('Imágenes en el estado:', images);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const progress = ((currentIndex + 1) / images.length) * 100;

  return (
    <div className="carousel-container">
      {images.length > 0 ? (
        <div
          className="carousel-content"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease', 
          }} 
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-image">
              <img src={`http://localhost:3000/${image.image_src}`} alt={`carousel-img-${index}`} />
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

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
