const express = require("express");
const {getAllUsers,getAllContacts} = require("../controllers/adnmin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-Middleware");
const adminMiddleware = require("../middlewares/admin-Middleawre");
const adminController = require("../controllers/adnmin-controller");
router.route("/users").get(authMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router.route("/contacts").get(authMiddleware, getAllContacts);
module.exports = router;