import express from "express";
import {
  login,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthentication from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/register").post(register); //??
router.route("/login").post(login);
router.route("/profile/update").put(isAuthentication, updateProfile);

export default router;
