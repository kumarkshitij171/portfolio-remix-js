import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'node:stream';

export const uploadImage = async (file: any) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            reject(new Error("Image upload failed"));
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );

      const stream = Readable.from(buffer);
      stream.pipe(uploadStream);
    });

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Image deletion failed");
  }
};
