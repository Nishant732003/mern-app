const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const { User } = require("../models/userModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file,userEmail) => {
  try {
    if (!file) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });
    //file has been uploaded succesfully
    console.log("File is uploadede on cloudinary", response.url);
    fs.unlinkSync(file.path);
    console.log(userEmail);
    const user = await User.findOneAndUpdate(
      { email: userEmail }, 
      { $set: { cloudinaryUrl: response.url } },
      { new: true } 
    );

    return response.url;
  } catch (error) {
   //remove the locally saved temporay file as the upload get failed
   console.error("Error uploading to cloudinary:", error);
    throw error; 
  }
};
module.exports = uploadOnCloudinary;
