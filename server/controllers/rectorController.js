const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Blocks = require("../models/blocksModel");
const User = require("../models/userModel");

const allocateBlock = async (req, res) => {
  try {
    const { name, start, end, capacity } = req.body;
    const isAllocated = await Blocks.findOne({ name: name });
    if (isAllocated) {
      await isAllocated.save();
      return res.status(409).json(isAllocated);
    } else {
      const blockDoc = await Blocks.create({ name: name });
      blockDoc.rooms = [];
      for (let i = start; i <= end; i++) {
        const room = {
          number: i,
          capacity: capacity,
        };
        blockDoc.rooms.push(room);
      }
      await blockDoc.save();
      return res.status(200).json(blockDoc);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

const getAllBlocks = async (req, res) => {
  try {
    const isAllocated = await Blocks.find({});
    return res.status(200).json(isAllocated);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

const allocateStudent = async (req, res) => {
  try {
    const { id } = req.params; // Block ID where we want to allocate the student
    const { roomNumber, rollNo } = req.body; // Room number and student ID

    const studentDoc = await User.findOne({ rollNo });
    const studentId = studentDoc._id;

    // Find the block with the given ID
    const block = await Blocks.findById(id);

    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    // Check if the student is already allocated to another block
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.blockId) {
      // Student is already allocated to a block, deallocate from the current block
      const currentBlock = await Blocks.findById(student.blockId);

      if (currentBlock) {
        // Remove the student from the current block's allocatedStudents array
        currentBlock.rooms.forEach((room) => {
          room.allocatedStudents.pull(studentId);
        });
        await currentBlock.save();
      }
    }

    // Find the room in the block with the given roomNumber
    const room = block.rooms.find((room) => room.number === roomNumber);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Allocate the student to the room
    room.allocatedStudents.push(studentId);

    // Update the student's blockId and roomNumber
    student.blockId = block._id;
    student.roomNumber = roomNumber;

    // Save the changes
    await block.save();
    await student.save();

    const blockDoc = await Blocks.findById(id).populate({
      path: "rooms.allocatedStudents",
      select:
        "-password -role -resetPasswordToken -resetPasswordExpires -createdAt -updatedAt",
    });

    const roomInfo = blockDoc.rooms.find((room) => room.number === roomNumber);


    return res
      .status(200)
      .json({ roomInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred: ${error}` });
  }
};

const getBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const blockDoc = await Blocks.findById(id).populate({
      path: "rooms.allocatedStudents",
      select:
        "-password -role -resetPasswordToken -resetPasswordExpires -createdAt -updatedAt",
    });

    if (!blockDoc) {
      return res.status(404).json({ message: "Block does not exist" });
    }

    return res.status(200).json(blockDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// Delete Block API
const deleteBlock = async (req, res) => {
  try {
    const { id } = req.params; // Block ID

    // Find the block with the given ID
    const block = await Blocks.findById(id);

    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    // Retrieve the list of allocated students in the block
    const allocatedStudents = block.rooms.reduce(
      (students, room) => students.concat(room.allocatedStudents),
      []
    );

    // Reset the blockId and roomNumber for all allocated students
    await User.updateMany(
      { _id: { $in: allocatedStudents } },
      { blockId: null, roomNumber: null }
    );

    // Delete the block
    await Blocks.findByIdAndDelete(id);

    return res.json({ message: "Block deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Error occurred: ${error}` });
  }
};

module.exports = {
  allocateBlock,
  getAllBlocks,
  allocateStudent,
  getBlock,
  deleteBlock,
};
