import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import formidable from "express-formidable";
import path from "path";
import {fileURLToPath } from 'url';
//configure
dotenv.config();
//Database config
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
//rest object
const app = express();

//middleware
// app.use(formidable());
app.use(express.static(path.join(__dirname, "./client/build")));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1> Welceome to SERVER</h1>");
// });
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port : ${PORT}`.bgCyan
      .white
  );
});
