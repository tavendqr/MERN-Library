import mongoose from "mongoose";
import Book from "./book.models.js";

export const getBooks = async(req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ success: true, data: books });
        console.log("Found books");
    } catch(error) {
        console.log("error fetching books");
        return res.status(500).json({ success: false, message: "Error fetching books" });
    }
};

export const createBooks = async (req, res) => {
    const book = req.body;

    if(!book.name || !book.author || ! book.price) {
          return res.status(400).json({ success: false, message: "Fill all fields" });
    }

    const price = parseFloat(book.price);

    if (isNaN(price)) {
        return res.status(400).json({ success: false, message: "Price must be a valid number" });
    }
   
    try {
        const newBook = new Book({
            ...book,
            price,
        }
        );
        await newBook.save();
        console.log("Book saved");
          return res.status(201).json({ success: true, data: newBook });
    } catch(error) {
        console.error("Error creating book", error);
        return res.status(500).json({ success: false, message: "Error creating book" });
    }
}