import express from "express";
import {
  getJobById,
  getAllJobs,
  postJob,
  getAdminJobs,
} from "../controllers/job.controller.js";
import isAuthentication from "../middleware/isAuthentication.js";

const router = express.Router();

router.route("/post").post(isAuthentication, postJob);
router.route("/get").get(isAuthentication, getAllJobs);
router.route("/getadminjobs").get(isAuthentication, getAdminJobs);
router.route("/get/:id").get(isAuthentication, getJobById);

export default router;
