const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    rollNo: {
      type: String,
    },
    role: {
      type: String,
      default: "Student",
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    roomNumber: {
      type: String,
      default: null,
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blocks",
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
