const express = require("express");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  addMeal,
  getMeals,
  editMeal,
  deleteMeal,
} = require("../controllers/mealController");
const { protectUser } = require("../middlewares/userProtect");

/* APIs */
router.post(
  "/add-meal",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  addMeal
);
router.get(
  "/get-meal",
  (req, res, next) => protectUser(req, res, next),
  getMeals
);
router.put(
  "/edit-meal/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  editMeal
);
router.delete(
  "/delete-meal/:id",
  (req, res, next) => protectUser(req, res, next, "Rector"),
  deleteMeal
);

module.exports = router;
