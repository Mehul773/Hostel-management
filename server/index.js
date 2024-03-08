/* MODULES */
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

/* ROUTERS */
const accountantRouter = require("./routes/accountantRoutes");
const rectorRouter = require("./routes/rectorRoutes");
const studentRouter = require("./routes/studentRoutes");
const foodRouter = require("./routes/foodRoutes");
const mealRouter = require("./routes/mealRoutes");
const userRouter = require("./routes/userRoutes");

const reportRouter = require("./routes/reportRoutes");

const noticeRouter = require("./routes/noticeRoutes");

/* CONFIGURATIONS */
dotenv.config();
const PORT = process.env.PORT || 4004;

/* EXPRESS CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/uploadsReport", express.static(__dirname + "/uploadsReport"));
app.use("/uploadsFood", express.static(__dirname + "/uploadsFood"));

/* STARTUP */
app.listen(PORT, () =>
  console.log(
    `Server started on`.cyan.bold + ` http://localhost:${PORT}`.blue
  )
);
connectDB();

/* APIs */
app.use("/", userRouter);
app.use("/accountant", accountantRouter);
app.use("/rector", rectorRouter);
//app.use("/student", studentRouter);
app.use("/food", foodRouter);
app.use("/meal", mealRouter); 
app.use("/notice", noticeRouter);
app.use("/report", reportRouter);
