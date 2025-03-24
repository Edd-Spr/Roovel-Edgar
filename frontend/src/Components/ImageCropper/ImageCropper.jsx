import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage";
import './ImageCropper.css';

const ImageCropper = ({ imageSrc, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCropComplete = useCallback(async (_, croppedAreaPixels) => {
    if (!imageSrc) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(croppedImg);
  }, [imageSrc]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="cropper-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={() => onCropComplete(croppedImage)}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;