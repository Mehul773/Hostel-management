const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  getAllStudents,
  getCurrentRollNo,
  allocateRollNo,
  getActiveSeries,
  createStudent,
} = require("../controllers/accountantController");
const { protectUser } = require("../middlewares/userProtect");

/* MULTER CONFIGURATIONS */

/* APIs */
router.post(
  "/all-students",
  (req, res, next) => protectUser(req, res, next, "Accountant"),
  getAllStudents
);

router.get(
  "/getrollno",
  (req, res, next) => protectUser(req, res, next, "Accountant"),
  getCurrentRollNo
);

router.get(
  "/allocaterollno",
  (req, res, next) => protectUser(req, res, next, "Accountant"),
  allocateRollNo
);

router.get(
  "/activeseries",
  (req, res, next) => protectUser(req, res, next, "Accountant"),
  getActiveSeries
);

router.post(
  "/createstudent",
  (req, res, next) => protectUser(req, res, next, "Accountant"),
  createStudent
);

module.exports = router;
