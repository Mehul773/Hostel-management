const mongoose = require("mongoose");

const RollNoSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const RollNoModel = mongoose.model("RollNo", RollNoSchema);
module.exports = RollNoModel;
