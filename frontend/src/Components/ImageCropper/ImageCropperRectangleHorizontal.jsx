import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImageURL";
import "./ImageCropper.css";

const ImageCropperRectangleHorizontal = ({ imageSrc, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropCompleteInternal = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const confirmCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImg); // Pasa blob
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="cropper-container large">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={9 / 6.5}
            cropShape="rect"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropCompleteInternal}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={confirmCrop}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperRectangleHorizontal;