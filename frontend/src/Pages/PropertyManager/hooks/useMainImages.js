import { useEffect, useRef, useState } from "react";
import { fromURLtoB64 } from "../../../utils";

export default function useMainImages() {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const [imageFiles, setImageFiles] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [croppedMainImage, setCroppedMainImage] = useState(null);
    const [croppingImage, setCroppingImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [newImageUrl, setNewImageUrl] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Maneja el clic para abrir el input de archivo
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Maneja el cambio de archivo en el contenedor principal
    const handleMainFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(URL.createObjectURL(file));
            setIsModalOpen(true);
            event.target.value = "";
        }
    };

    // Maneja el cambio de archivo para imágenes adicionales
    const handleImageChange = (e) => {
        const newFile = Array.from(e.target.files)[0];
        if (!newFile) return;

        const isDuplicate = imageFiles.some((existingFile) => existingFile.name === newFile.name);
        if (isDuplicate) {
            setErrorMessage("No puedes subir la misma imagen 2 veces");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        const newImageUrl = URL.createObjectURL(newFile);
        setCroppingImage(newImageUrl);
        setOriginalFile(newFile);

        e.target.value = "";
    };

    // Maneja el recorte completo de la imagen
    const handleCropComplete = (croppedImageBlob) => {
        if (!croppedImageBlob) return;

        const imageUrl = URL.createObjectURL(croppedImageBlob);
        setImages((prev) => [...prev, imageUrl]);
        setImageFiles((prev) => [...prev, originalFile]);

        setCroppingImage(null);
        setOriginalFile(null);
        setNewImageUrl(true);
    };

    // Maneja la cancelación del recorte
    const handleCancelCrop = () => {
        setCroppingImage(null);
        setOriginalFile(null);
    };

    // Maneja la eliminación de una imagen adicional
    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // if it's been added a new image, convert it to base64
    useEffect(() => {
        const convertToBase64 = async () => {
            if (!images?.length) return;
    
            const converted = await Promise.all(
                images.map(async (file) => {
                    if (typeof file === 'string' && !file.startsWith('blob:')) return file;
                    if (typeof file === 'string' && file.startsWith('blob:')) return await fromURLtoB64(file);
                })
            );
    
            setImages(converted);
            setNewImageUrl(false);
        };
    
        if (newImageUrl) convertToBase64();
    }, [ newImageUrl ] );

    // if was added a new image, convert it to base64
    useEffect(() => {
        const convertToBase64 = async () => {
            const converted = await fromURLtoB64(croppedMainImage);
            setMainImage(converted);
        };
        
        if (croppedMainImage) convertToBase64();
        setCroppedMainImage();

    }, [ croppedMainImage ]);

    function resetHook() {
        setImages([]);
        setMainImage(null);
        setErrorMessage("");
        setImageFiles([]);
        setImageFile(null);
        setCroppedMainImage(null);
        setCroppingImage(null);
        setOriginalFile(null);
        setNewImageUrl(false);
    }

    return {
        images,
        mainImage,
        fileInputRef,
        errorMessage,
        handleImageClick,
        handleMainFileChange,
        handleImageChange,
        handleCropComplete,
        handleCancelCrop,
        handleDeleteImage,
        croppingImage,
        setCroppedMainImage,
        isModalOpen,
        setIsModalOpen,
        imageFile,
        setImageFile,
        originalFile,
        setOriginalFile,
        resetHook,
  }
}
