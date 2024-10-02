import { useState, useCallback } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop'; // Ensure this library is installed
import { getCroppedImg } from '../utils/cropImage'; // Make sure the path is correct

export default function Home() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Final cropped image

  // Handle selecting an image from folder
  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping area change
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Function to crop and generate final image
  const handleCropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div>
      <h1>Welcome to My Next.js Image App</h1>

      {/* Image selection from folder */}
      <input type="file" accept="image/*" onChange={handleImageSelection} />

      {/* Display image for cropping */}
      {imageSrc && (
        <>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button onClick={handleCropImage}>Crop Image</button>
        </>
      )}

      {/* Display the cropped image */}
      {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <Image
            src={croppedImage}
            alt="Cropped Image"
            width={500}
            height={300}
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
}
