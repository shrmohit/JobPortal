import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // ✅ Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // ✅ Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // ✅ Create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // ✅ Add application to job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// get all applied jobs
export const getAllAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).populate({
      path: 'job',
      populate: { path: 'company' },
    });

    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin dekhega ki kitne user ne apply kiya hai
export const getApplicants = async (req, res) => {
  console.log('getApplicants');
  try {
    const jobId = req.params.id;
    const id = req.id;

    console.log('ID ', jobId);

    const applicants = await Application.find({ job: jobId })
      .sort({ createdAt: -1 }) // sort directly if needed
      .populate('applicant'); // assuming applicant is a ref field

    if (!applicants || applicants.length === 0) {
      return res.status(404).json({
        message: 'No applicants found for this job',
        success: false,
      });
    }

    return res.status(200).json({
      applicants,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// update ststus of applicant
export const updateStatus = async (req, res) => {
  console.log('status');
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    console.log('aid ', applicationId);
    console.log(status);

    if (!status) {
      return res.status(400).json({
        message: 'Status is required',
        success: false,
      });
    }

    //find the application by application id
    const application = await Application.findById(applicationId);
    console.log('📄 Fetched Application:', application);
    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save(); //??

    return res.status(200).json({
      message: 'Status Update successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
