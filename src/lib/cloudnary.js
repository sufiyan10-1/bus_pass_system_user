import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadImage = (buffer, mimeType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Handle images, videos, etc.
        format: mimeType.split("/")[1], // Extract format from MIME type (e.g., 'jpeg' from 'image/jpeg')
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    // End the stream by passing the buffer
    uploadStream.end(buffer);
  });
};

export { UploadImage };
