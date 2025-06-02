import express from "express";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import Router from "./book.route.js";
import userRoute from "./auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/display", Router);
app.use("/api/auth", userRoute);

app.listen(5000, () => {
    connectDB();
    console.log("5000");
});