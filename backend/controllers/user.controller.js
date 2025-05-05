import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user controller logic
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
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
      role,
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
    const { fullname, email, phoneNumber, profile, bio, skills } = req.body;
    const file = req.file;

    //cloudinary ayega yaha pe

    // skill ko array me convert karna hai
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    //resume comes later here..
    await user.save();

    //update data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    return res.status(200).json({
      message: "Profile updated successfully",
      user, //??
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
