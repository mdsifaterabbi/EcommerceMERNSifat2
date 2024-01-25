import express from "express";
import colors from "colors";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import router from './routes/authRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import productRouter from './routes/productRoute.js'
import cors from 'cors';

//configure dotenv
dotenv.config();

//database connection
connectDB();

const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes [note: app.use() call the exported route]
app.use("/api/v1/auth", router);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "This is eCommerce MERN Full Stack App",
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is runnin on ${process.env.DEV_MODE} on PORT: ${PORT}`.bgCyan.white
  );
});