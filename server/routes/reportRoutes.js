const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  addReport,
  getReport,
  getReports,
  deleteReport,
} = require("../controllers/reportController");
const { protectUser } = require("../middlewares/userProtect");

/* MULTER CONFIGURATIONS */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploadsReport")) {
      fs.mkdirSync("uploadsReport");
    }
    cb(null, "uploadsReport");
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
router.post(
  "/add-report",
  (req, res, next) => protectUser(req, res, next, "Student"),
  upload.single("photo"),
  addReport
);

router.get(
  "/get-report",
  (req, res, next) => protectUser(req, res, next, "Student"),
  getReport
);
router.get(
  "/get-reports",
  (req, res, next) => protectUser(req, res, next, "Both"),
  getReports
);
router.delete(
  "/delete-report/:id",
  (req, res, next) => protectUser(req, res, next, "Both"),
  deleteReport
);

module.exports = router;
