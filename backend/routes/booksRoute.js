import express from "express";
import { Book } from "../models/BookModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  // create new book
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send("one of porperties request is missing");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
});

router.get("/", async (req, res) => {
  // get all books
  try {
    const books = await Book.find({});
    res.status(200).json({
      length: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  // get book by id
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  // update book by id
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: "one of the properties is missing" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "ID not found" });
    }
    return res.status(200).send({ message: "The book update successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  // delete book by id
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "The id was not found" });
    }
    return res.status(200).send({ message: "The book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
