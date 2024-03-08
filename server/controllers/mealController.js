const Meal = require("../models/mealModel");

/* ADD MEAL */
const addMeal = async (req, res) => {
  try {
    const { breakfast, lunch, dinner } = req.body;

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await Meal.deleteMany({ date: { $ne: date } });

    var mealExists = await Meal.findOne({ date: date });

    if (mealExists) {
      breakfast == null
        ? (mealExists.breakfast = mealExists.breakfast)
        : (mealExists.breakfast = breakfast);
      lunch == null
        ? (mealExists.lunch = mealExists.lunch)
        : (mealExists.lunch = lunch);
      dinner == null
        ? (mealExists.dinner = mealExists.dinner)
        : (mealExists.dinner = dinner);
      mealExists = await mealExists.save();
      return res.status(200).json(mealExists);
    }

    const mealDoc = await Meal.create({
      breakfast,
      lunch,
      dinner,
      date,
    });

    return res.status(200).json(mealDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* GET TODAY'S MEALS */
const getMeals = async (req, res) => {
  try {
    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const mealIteams = await Meal.findOne({ date: date })
      .populate("breakfast")
      .populate("lunch")
      .populate("dinner");

    if (mealIteams) {
      return res.status(200).json(mealIteams);
    } else {
      return res.status(200).json({ breakfast: [], lunch: [], dinner: [] });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* EDIT MEAL */
const editMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { breakfast, lunch, dinner } = req.body;

    const mealDoc = await Meal.findById(id);

    if (!mealDoc) {
      return res.status(404).json({ message: "Meal does not exists" });
    }

    await mealDoc.set({
      breakfast,
      lunch,
      dinner,
    });
    await mealDoc.save();
    res.status(200).json(mealDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* DELETE MEAL */
const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const mealDoc = await Meal.findById(id);

    if (!mealDoc) {
      return res.status(404).json({ message: "Meal does not exists" });
    }

    console.log(mealDoc);
    await Meal.deleteOne({ _id: id });
    return res.status(200).json({ message: "Meal deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

module.exports = {
  addMeal,
  getMeals,
  editMeal,
  deleteMeal,
};
