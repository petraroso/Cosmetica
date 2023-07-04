require("dotenv").config();
var helmet = require("helmet");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

//for security
app.use(helmet());

app.use(express.json());
//using as middleware
app.use(cookieParser());
app.use(fileUpload());

const apiRoutes = require("./routes/apiRoutes");

app.get("/", (req, res, next) => {
  res.json({ message: "API running..." });
});

//connect to mongodb database
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

//when deployed, most of errors should not be seen
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
