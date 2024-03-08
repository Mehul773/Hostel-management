
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const FoodModel = mongoose.model("Food", FoodSchema);
module.exports = FoodModel;
