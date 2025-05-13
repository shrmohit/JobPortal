import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinar.js";
import getDataUri from "../utils/datauri.js";

/*
register company controller logic
get all companies controller logic
get company by id controller logic
update company controller logic
*/

// register company controller logic
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    // company ka naa hamesha unique hona chahiye
    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered sucessfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get all companies controller logic
export const getCompany = async (req, res) => {
  try {
    // get all companies from database
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "compnies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get company by id controller logic
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// update company controller logic
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //idhar cloudinary aayega
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;
    // console.log(logo);

    const updateData = {
      name,
      description,
      website,
      location,
      logo,
    };

    let company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
