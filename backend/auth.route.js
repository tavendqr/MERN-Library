import express from "express";
import { loginUser, signUpUser } from "./auth.controller.js";

const router = express.Router();
router.post("/login", loginUser);
router.post("/signup", signUpUser);

export default router;
