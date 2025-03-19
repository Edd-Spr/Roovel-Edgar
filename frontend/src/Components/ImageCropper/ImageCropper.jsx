import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage";

const ImageCropper = ({ imageSrc, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(croppedImg);
  }, [imageSrc]);

  return (
    <div className="cropper-container">
      <div className="cropper-wrapper">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // Relación cuadrada
          cropShape="round" // Hace que el área de recorte tenga un círculo de vista previa
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
        <div className="crop-preview" />
      </div>
      <div className="controls">
        <button onClick={() => onCropComplete(croppedImage)}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ImageCropper;