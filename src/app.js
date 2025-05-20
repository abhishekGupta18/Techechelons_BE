require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const projectRouter = require("./routes/project");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://techechelons-fe.vercel.app/",
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

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
