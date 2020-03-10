const cloudinary = require("cloudinary");
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "",
  api_key: process.env.CLOUDINARY_KEY || "",
  api_secret: process.env.CLOUDINARY_SECRET || ""
});

const getStorage = (folder, transformation) =>
  cloudinaryStorage({
    cloudinary,
    transformation,
    folder,
    allowedFormats: ["jpg", "jpeg", "png"]
  });

module.exports = (folder, transformation) =>
  multer({ storage: getStorage(folder, transformation) });
