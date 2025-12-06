/**
 * Image optimization utilities
 * Use these helpers to serve optimized images
 */

/**
 * Generate Cloudinary optimized image URL
 * @param {string} imageUrl - Original image URL
 * @param {object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export const optimizeCloudinaryImage = (imageUrl, options = {}) => {
  if (!imageUrl) return '/user.png';
  
  // If not a Cloudinary URL, return as-is
  if (!imageUrl.includes('cloudinary')) {
    return imageUrl;
  }

  const {
    width = 300,
    height = 300,
    quality = 'auto', // auto, 80, 70, etc.
    format = 'auto', // auto, webp, jpg, png
  } = options;

  // Extract public ID from Cloudinary URL
  const urlParts = imageUrl.split('/upload/');
  if (urlParts.length !== 2) return imageUrl;

  const publicId = urlParts[1];
  
  // Build optimized URL
  const optimizedUrl = `${urlParts[0]}/upload/c_fill,w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
  
  return optimizedUrl;
};

/**
 * Get srcSet for responsive images
 * @param {string} imageUrl - Base image URL
 * @returns {string} srcSet string for img tag
 */
export const getResponsiveImageSrcSet = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) {
    return '';
  }

  return `
    ${optimizeCloudinaryImage(imageUrl, { width: 100 })} 100w,
    ${optimizeCloudinaryImage(imageUrl, { width: 200 })} 200w,
    ${optimizeCloudinaryImage(imageUrl, { width: 300 })} 300w,
    ${optimizeCloudinaryImage(imageUrl, { width: 600 })} 600w
  `.trim();
};

/**
 * Lazy load image component
 * Use <img loading="lazy" src="..." />
 * This is native browser feature, no extra code needed
 */

export default {
  optimizeCloudinaryImage,
  getResponsiveImageSrcSet,
};
