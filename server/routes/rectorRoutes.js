const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  allocateBlock,
  getAllBlocks,

  allocateStudent,
  getBlock,
  deleteBlock,
} = require("../controllers/rectorController");
const { protectUser } = require("../middlewares/userProtect");

/* MULTER CONFIGURATIONS */

/* APIs */
router.post(
  "/allocate-block",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  allocateBlock
);

router.get(
  "/get-blocks",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  getAllBlocks
);

router.post(
  "/allocate-student/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  allocateStudent
);

router.get(
  "/get-block/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  getBlock
);

router.delete(
  "/delete-block/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  deleteBlock
);

module.exports = router;
