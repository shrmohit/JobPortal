import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinar.js";

// register user controller logic
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    const normalizedRole =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(); // makes "student" -> "Student"
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    //jab same email se user dubara register karta hai to use below code check karta hai
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }
    // password ko hash karna
    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashedpassword,
      phoneNumber,
      role: normalizedRole,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// login user controller logic

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    // user usi email se login karega jisse usne register kara hai or wahi uske database me hogi
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email and password",
        success: false,
      });
    }

    // password check karega ki user ne jo password diya hai wo database me jo password hai usse match karega ya nahi
    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email and password",
        success: false,
      });
    }

    // check role correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    // token ko generate karna hai
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // token ko cookie me store karna hai  and ye wli line security ke liye hai maxAge: 1 * 24 * 60 * 60 * 1000,httpOnly: true, sameSite: "strict",
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// logout user controller logic
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out sucessfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// update profile controller logic

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // cloudinary ayega idhar
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // ✅ Create profile object if missing
    if (!user.profile) {
      user.profile = {};
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // ✅ Now safe to update fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes here
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // save the original file name
    }
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
