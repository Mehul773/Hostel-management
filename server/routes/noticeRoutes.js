const express = require("express");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  addNotice,
  editNotice,
  getAllNotices,
  deleteNotice,
  getNotice,
} = require("../controllers/noticeController");
const { protectUser } = require("../middlewares/userProtect");

/* APIs */
router.post(
  "/add-notice",
  (req, res, next) => protectUser(req, res, next, "Both"),
  addNotice
);
router.put(
  "/edit-notice/:id",
  (req, res, next) => protectUser(req, res, next, "Both"),
  editNotice
);
router.get(
  "/get-notices",
  (req, res, next) => protectUser(req, res, next),
  getAllNotices
);
router.delete(
  "/delete-notice/:id",
  (req, res, next) => protectUser(req, res, next, "Both"),
  deleteNotice
);
router.get(
  "/get-notice/:id",
  (req, res, next) => protectUser(req, res, next),
  getNotice
);

module.exports = router;
