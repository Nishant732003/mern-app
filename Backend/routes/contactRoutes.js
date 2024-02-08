const express = require("express");
const router = express.Router();
const contactForm=require("../controllers/formController")

router.route("/contact").post(contactForm);
module.exports=router;