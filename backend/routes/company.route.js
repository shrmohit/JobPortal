import express from "express";
import {
  getCompany,
  registerCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthentication from "../middleware/isAuthentication.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthentication, registerCompany);
router.route("/get").get(isAuthentication, getCompany);
router.route("/get/:id").get(isAuthentication, getCompanyById);
router.route("/update/:id").put(isAuthentication, singleUpload, updateCompany);

export default router;
