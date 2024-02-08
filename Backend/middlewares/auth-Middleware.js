const JWT = require("jsonwebtoken");
 require("dotenv").config();
const { User } = require("../models/userModel");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP,Token Not Provided" });
  }

  //assume token is from Bearere <jwt token> removing the Beareer and extra space
  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("From middleware",jwtToken);
  // console.log(process.env.JWT_SECRET);
    try {
        const isVerified = JWT.verify(jwtToken, process.env.JWT_SECRET);
        
        const userData = await User.findOne({ email: isVerified.email }).select({password:0});
        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
     
    next();
  } catch (error) {
   console.error("Token verification error:", error);
   if (error.name === "JsonWebTokenError") {
     return res.status(401).json({ message: "Unauthorized, Invalid Token" });
   } else {
     return res.status(500).json({ message: "Internal Server Error" });
   }
  }
};
module.exports = authMiddleware;
