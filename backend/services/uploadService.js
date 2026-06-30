import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blog-images" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

export const uploadImage = async (fileBuffer) => {
  const result = await streamUpload(fileBuffer);
  return { url: result.secure_url };
};
