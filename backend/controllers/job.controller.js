import { Job } from '../models/job.model.js';
import mongoose from 'mongoose';

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      companyId,
      experience,
      salary,
      position,
      jobType,
    } = req.body;
    const user = req.id;

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !requirements ||
      !experience ||
      !position ||
      !jobType
    ) {
      return res.status(400).json({
        message: 'something is missing',
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: 'Invalid companyId format. Must be a valid ObjectId.',
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(','),
      location,

      experienceLevel: experience,
      salary: Number(salary),
      position,
      jobType,
      company: companyId,
      created_by: req.id,
    });

    return res.status(201).json({
      message: 'New job created successfully',
      job,
      success: true,
    });
  } catch (error) {
    console.log('post job', error);
  }
};

// student k liye job post krne ka logic

export const getAllJobs = async (req, res) => {
  try {
    // add filtering in get jobs
    const keyword = req.query.keyword || '';
    //create a query
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };

    /*
    Note : .populate({ path: "company" })
      .sort({ createdAt: -1 }) iska use hame company is string ki jagah uski information dekhate hai
      jo company ki id hai job me. Aur sort ka use hame latest job pehle dikhane ke liye hota hai.
     */
    const jobs = await Job.find(query)
      .populate({ path: 'company' })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: 'Jobs not found',
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//student k liye job ka detail dekhne ka logic

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin kitne job create kra hai abhi tk

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    console.log('Current user ID:', req.id);
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
    });
    console.log('Matching jobs:', jobs);
    if (!jobs) {
      return res.status(404).json({
        message: 'Jobs not found',
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
