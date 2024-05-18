import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
//configure
dotenv.config();


//rest object
const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//Database config
connectDB();
//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1> Welceome to SERVER</h1>");
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
