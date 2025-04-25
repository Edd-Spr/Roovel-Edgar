export async function getCroppedImg(imageSrc, crop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    ctx.drawImage(
      image,
      crop.x, crop.y, crop.width, crop.height,
      0, 0, crop.width, crop.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob); // 👈 devuelve el blob directamente
      }, "image/jpeg");
    });
  }
  
  async function createImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  }