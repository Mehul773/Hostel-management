const Report = require("../models/reportModel");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");

/*ADD REPORT */
const addReport = async (req, res) => {
  try {
    const { title, description, receiver } = req.body;

    let reportPhoto;

    if (req.file) {
      reportPhoto = req.file.filename;
    }

    const reportExists = await Report.findOne({ title });

    if (reportExists) {
      return res.status(409).json({ message: "Report already exists" });
    }

    const reportDoc = await Report.create({
      title,
      description,
      author: req.user._id,
      photo: reportPhoto,
      receiver,
    });

    return res.status(200).json(reportDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* STUDENT CAN GET OWN REPORT */
const getReport = async (req, res) => {
  try {
    const reportDoc = await Report.find({ author: req.user._id });
    if (reportDoc) {
      return res.status(200).json(reportDoc);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* RECTOR AND ACCOUNTANT CAN SEE STUDENT'S REPORT */
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ receiver: req.user.role }).populate("author");
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* RECTOR AND ACCOUNTANT CAN MARK AS READ STUDENT'S REPORT */
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reportDoc = await Report.findById(id);
    if (!reportDoc) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (reportDoc.receiver !== req.user.role) {
      return res.status(401).json({ message: "Authorization failed" });
    }

    // Delete previous Report photo
    if (reportDoc.photo) {
      const filePath = path.join("uploadsReport", reportDoc.photo);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting previous profile photo:", err);
        }
      });
    }

    await Report.deleteOne({ _id: id });
    return res.status(200).json({ message: "Report deleted" });

  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

module.exports = {
  addReport,
  getReport,
  getReports,
  deleteReport,
};
