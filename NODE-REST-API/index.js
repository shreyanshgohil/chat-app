import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => app.listen(8800))
  .then(() => console.log("connected to database and listner to localhost"))
  .catch((err) => console.log(err));
// middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uplodaded succesfully");
  } catch (err) {
    console.log(err);
  }
});
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoutes);
