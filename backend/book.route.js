import express from 'express';
import { getBooks, createBooks } from "./book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBooks);

export default router;
