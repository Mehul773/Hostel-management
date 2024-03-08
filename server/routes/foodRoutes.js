const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  addFood,
  getFoods,
  deleteFood,
  editFood,
  getFood,
} = require("../controllers/foodController");
const { protectUser } = require("../middlewares/userProtect");

/* MULTER CONFIGURATIONS */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploadsFood")) {
      fs.mkdirSync("uploadsFood");
    }
    cb(null, "uploadsFood");
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
  "/add-food",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  upload.single("photo"),
  addFood
);
router.get(
  "/get-foods",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  getFoods
);
router.put(
  "/edit-food/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  upload.single("photo"),
  editFood
);
router.delete(
  "/delete-food/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  deleteFood
);
router.get(
  "/get-food/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  getFood
);

module.exports = router;
