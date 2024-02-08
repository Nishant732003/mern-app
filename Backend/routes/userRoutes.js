const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/userController");
const signupSchema = require("../validator/userValidator");
const validate = require("../middlewares/validator");
const upload = require("../middlewares/useMulter");
const loginSchema = require("../validator/loginValidator");
const authMiddleware = require("../middlewares/auth-Middleware");
// const UploadOnCloudinary = require("../fileUpload/Cloudinary");
//insted of doing like {home ,register,services contact} we can pass it
// by refrence and get it in route using . operator



///router.get for single get request only
//for chaning
router.route("/").get(authControllers.home);
router.route("/register").post(
  upload.single("profileImage"),
  validate(signupSchema),
 

 authControllers.register
);
router.route("/login").post(validate(loginSchema),authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);



module.exports = router;