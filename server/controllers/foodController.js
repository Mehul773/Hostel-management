const Food = require("../models/foodModel");
const fs = require("fs");
const path = require("path");

/* ADD FOOD */
const addFood = async (req, res) => {
  try {
    const { name } = req.body;
    let foodPhotoName;

    if (req.file) {
      foodPhotoName = req.file.filename;
    }

    const foodExists = await Food.findOne({ name });

    if (foodExists) {
      return res.status(409).json({ message: "Food already exists" });
    }

    const foodDoc = await Food.create({
      name,
      photo: foodPhotoName,
    });

    return res.status(200).json(foodDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* GET ALL FOOD */
const getFoods = async (req, res) => {
  try {
    const foodItems = await Food.find({});
    if (foodItems) {
      return res.status(200).json(foodItems);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* GET A FOOD */
const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItems = await Food.findById(id);
    if (foodItems) {
      return res.status(200).json(foodItems);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* EDIT FOOD */
const editFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let foodPhotoName;

    if (req.file) {
      foodPhotoName = req.file.filename;
    }

    const foodDoc = await Food.findById(id);

    if (!foodDoc) {
      return res.status(404).json({ message: "Food does not exists" });
    }
    // Delete previous food photo
    if (foodDoc.photo) {
      const filePath = path.join("uploadsFood", foodDoc.photo);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting previous profile photo:", err);
        }
      });
    }

    if (foodPhotoName) {
      foodDoc.set({
        name,
        photo: foodPhotoName,
      });
    } else {
      foodDoc.set({
        name,
      });
    }
    await foodDoc.save();
    res.status(200).json(foodDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* DELETE FOOD */
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const foodDoc = await Food.findById(id);

    if (!foodDoc) {
      return res.status(404).json({ message: "Food does not exists" });
    }

    await Food.deleteOne({ _id: id });
    return res.status(200).json({ message: "Food deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

module.exports = {
  addFood,
  getFoods,
  deleteFood,
  editFood,
  getFood,
};
