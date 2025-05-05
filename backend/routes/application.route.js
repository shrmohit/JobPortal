import express from "express";

import isAuthentication from "../middleware/isAuthentication.js";
import {
  applyJob,
  getAllAppliedJobs,
  getApplicants,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthentication, applyJob);
router.route("/get").get(isAuthentication, getAllAppliedJobs);
router.route("/:id/applicants").get(isAuthentication, getApplicants);
router.route("/status/:id/update").put(isAuthentication, updateStatus);

export default router;
