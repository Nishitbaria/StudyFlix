/** @format */

const cloudinary = require("cloudinary").v2;

exports.uploudImageToCloudinary = async (file, folder, height, quality) => {
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resourcetype = "auto";

  return await cloudinary.uploader.upload(file, tempFilePath, options);
};
