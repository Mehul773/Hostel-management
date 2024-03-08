const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/* SALT */
const salt = bcrypt.genSaltSync(10);

/* REGISTER */
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, rollNo } = req.body;
    let profilePhoto;

    if (req.file) {
      profilePhoto = req.file.filename;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      profilePhoto,
      role,
      rollNo,
    });

    return res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* LOGIN */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "User does not exists" });
    }

    const decodedPassword = bcrypt.compareSync(password, userExists.password);

    if (!decodedPassword) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET, {});

    if (!token) {
      return res.status(401).json({ message: "Token is not generated" });
    }

    return res
      .cookie("_token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      })
      .status(201)
      .json(userExists);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* LOGOUT */
const logoutUser = (req, res) => {
  try {
    const { _token } = req.cookies;
    if (_token) {
      res.status(201).clearCookie("_token").json(true);
    } else {
      res.status(404).json(false);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* PROFILE */
const getProfile = (req, res) => {
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* USER PROFILE PHOTO UPDATE*/
const userProfilePhotoUpdate = async (req, res) => {
  try {
    let profilePhoto;
    if (req.file) {
      profilePhoto = req.file.filename;
    }

    const userDoc = await User.findById(req.user._id);
    // Delete previous profile photo
    if (userDoc.profilePhoto) {
      const filePath = path.join("uploads", userDoc.profilePhoto);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting previous profile photo:", err);
        }
      });
    }

    if (userDoc) {
      userDoc.set({
        profilePhoto,
      });
      await userDoc.save();
      res.json("Photo uploaded");
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* UPDATE STIDENT PROFILE */
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const studentDoc = await User.findById(id);

    if (!studentDoc) {
      return res.status(400).json({ message: "User does not exists" });
    }

    await studentDoc.set({
      name,
      phone,
    });
    await studentDoc.save();
    res.status(200).json(studentDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token and its expiration time
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    // Store the reset token and its expiration time in the user's document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiration;
    await user.save();

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email provider details here
      service: "Gmail",
      auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send the reset email to the user
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested to reset the password for your account.\n\n
        Please click on the following link to complete the process:\n\n
        ${process.env.CLIENT_URL}/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email, and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user with the provided reset token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllStudents = async(req,res)=>{
  try {
    const studentssDoc = await User.find({role:"Student"}).populate({path:"blockId",select:"name"})
    res.status(200).json(studentssDoc)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  userProfilePhotoUpdate,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllStudents,
};
