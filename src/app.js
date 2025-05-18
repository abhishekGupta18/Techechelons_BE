require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const projectRouter = require("./routes/project");

const app = express();

app.use(express.json());

app.use("/", projectRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("DB connection failed: " + e.message);
  });
