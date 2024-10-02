// utils/cropImage.js
import { createImage } from './createImage'; // Ensure this path is correct

export const getCroppedImg = async (imageSrc, crop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const pixelRatio = window.devicePixelRatio;
  const { width, height } = crop;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.drawImage(image, crop.x, crop.y, width, height, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg');
};
