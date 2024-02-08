const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const upload = require("../middlewares/useMulter");
const uploadOnCloudinary = require("../fileUpload/Cloudinary");
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Hello World");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
      const { fullName, email, password, phone,profileImage } = req.body;
      console.log(req.body);
      const userExist = await User.findOne({ email });
       const cloudinaryUrl = await uploadOnCloudinary(req.file,req.body.email);
        if (userExist) res.status(400).json({ message: "Email alredy Exist" });
         
        //hash the password
        // const salt = 10;
        // const hash_password = await bcrypt.hash(password, salt);
          const userCreated = await User.create({
            fullName,
            email,
            phone,
            password,
            profileImage: `/Images/${req.file.filename}`,
            cloudinaryUrl,
          });
      
       
      const localPath = req.file;
      console.log("path of Image",localPath);
        res.status(201).json({
            message: req.body,
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            cloudinaryUrl
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error from here" });
    }
}

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
      const userExist = await User.findOne({ email });
      // console.log(userExist);
    if (!userExist)  return res.status(400).json({ message: "Invalid Credentials" });

      //   const user = await bcrypt.compare(password,userExist.password);
    const user = await userExist.comparePassword(password);
    console.log(userExist);
  if(user){
      res.status(200).json({
        message: "Login Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        cloudinaryUrl: userExist.cloudinaryUrl,
      });
  } else {
      res.status(401).json({ message: "Invalid email or Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//user logic to send user data


const user = async(req,res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({  userData });
  } catch (error) {
    console.log(`error from the user ${error}`);
  }
}

module.exports = { home, register,login,user };