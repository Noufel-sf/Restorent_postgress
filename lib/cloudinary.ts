import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image file to Cloudinary
 * @param file - File object from FormData
 * @returns Secure URL of uploaded image
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a Promise wrapper
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'food-images', // Organize in a folder
          resource_type: 'auto',
          transformation: [
            { width: 800, height: 800, crop: 'limit' }, // Limit size
            { quality: 'auto' }, // Auto optimize quality
            { fetch_format: 'auto' }, // Auto format (WebP when supported)
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
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete an image from Cloudinary by URL
 * @param imageUrl - The Cloudinary URL to delete
 */
export async function deleteFromCloudinary(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from URL
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = `food-images/${filename.split('.')[0]}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    // Don't throw - deletion failure shouldn't break the app
  }
}
