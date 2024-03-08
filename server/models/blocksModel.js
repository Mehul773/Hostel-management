const mongoose = require("mongoose");

const BlocksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rooms: [
      {
        number: {
          type: String,
        },
        capacity: {
          type: Number,
        },
        allocatedStudents: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Assuming you have a User model defined
          },
        ],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

BlocksSchema.pre("save", async function (next) {
  const block = this;
  try {
    for (const room of block.rooms) {
      if (room.allocatedStudents.length > room.capacity) {
        throw new Error(
          "The number of allocated users exceeds the room capacity."
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const BlocksModel = mongoose.model("Blocks", BlocksSchema);
module.exports = BlocksModel;
