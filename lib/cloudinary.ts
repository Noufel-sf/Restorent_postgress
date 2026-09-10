import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary if credentials exist
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload an image file to Cloudinary, or convert to Data URL if unconfigured
 * @param file - File object from FormData
 * @returns Secure URL or Data URL of uploaded image
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  try {
    // If Cloudinary is not configured, fallback to base64 Data URL for standalone mock mode
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const mime = file.type || 'image/png';
      return `data:${mime};base64,${base64}`;
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a Promise wrapper
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'food-images',
          resource_type: 'auto',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('No result from Cloudinary'));
        }
      );

      uploadStream.end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.warn('Cloudinary upload fallback to data URL due to error:', error);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    return `data:${file.type || 'image/png'};base64,${base64}`;
  }
}

/**
 * Delete an image from Cloudinary by URL (no-op in standalone mode)
 */
export async function deleteFromCloudinary(imageUrl: string): Promise<void> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return;
    }
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = `food-images/${filename.split('.')[0]}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
}
