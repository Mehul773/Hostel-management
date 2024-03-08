const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  userProfilePhotoUpdate,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllStudents,
} = require("../controllers/userController");
const { protectUser } = require("../middlewares/userProtect");

/* MULTER CONFIGURATIONS */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

/* APIs */
router.post("/register", upload.single("profilePhoto"), registerUser);
router.post("/login", loginUser);

router.put(
  "/profile-photo-update",
  (req, res, next) => protectUser(req, res, next),
  upload.single("profilePhoto"),
  userProfilePhotoUpdate
);
router.put("/update-profile/:id", protectUser, updateProfile);

router.post(
  "/logout",
  (req, res, next) => protectUser(req, res, next),
  logoutUser
);
router.get(
  "/profile",
  (req, res, next) => protectUser(req, res, next),
  getProfile
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/get-students",(req, res, next) => protectUser(req, res, next, "Both"),getAllStudents)

module.exports = router;
