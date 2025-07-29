import {CLOUDINARY_URL} from "./cloudinary.js";

const CLOUDINARY_UPLOAD_PRESET = 'MoneyManager'

const uploadProfileImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed: ${errorData.error.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Image uploaded successfully:', data);
    return data.secure_url;

  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw the error for further handling
  }
}

export default uploadProfileImage;
