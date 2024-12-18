import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the MERN stack tutorial");
});

app.use("/books", booksRoute); // use the bookRoute

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
