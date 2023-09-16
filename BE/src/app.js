import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routerProducts from "./routers/products.js";
import routerCategory from "./routers/category.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use(cors());
app.use("/api", routerProducts);
app.use("/api", routerCategory);

app.listen(8080, async () => {
    await mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Server is running 8080");
});
