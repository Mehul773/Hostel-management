const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    breakfast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Food",
      },
    ],
    lunch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Food",
      },
    ],
    dinner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Food",
      },
    ],
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const MealModel = mongoose.model("Meal", MealSchema);
module.exports = MealModel;
