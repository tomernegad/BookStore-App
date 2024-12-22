import React from "react";
import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  function handleDeleteBook() {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happend. Please try again later");
      });
  }
  return (
    <div className="p-4">
      {loading ? <Spinner /> : ""}
      <BackButton />
      <h1 className="my-4 text-3xl">Delete Book</h1>
      <div className="border-2 border-sky-400 mx-auto w-[600px] my-4 p-8 flex flex-col rounded-xl items-center">
        <h1 className="text-2xl ">
          Are you sure you want to delete this book?
        </h1>
        <button
          className="bg-red-600 text-white p-4 m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
