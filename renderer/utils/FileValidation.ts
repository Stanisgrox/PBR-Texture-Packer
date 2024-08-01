export const fileValidation = (file: File | null) => {
    if (!file) return;
    if(!allowedExtensions.exec(file.name)) return false;
    return true;
  }
  
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.tiff|\.tif|\.webp)$/i;