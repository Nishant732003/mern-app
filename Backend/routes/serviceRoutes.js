const express = require("express");
const services = require("../controllers/serviceController");
const router = express.Router();

router.route("/service").get(services);
module.exports = router;