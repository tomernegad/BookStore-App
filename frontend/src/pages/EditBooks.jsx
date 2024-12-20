import React from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
const EditBooks = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  function handelEditBook() {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  return (
    <div className="p-4">
      {loading ? <Spinner /> : ""}
      <BackButton />
      <h1 className="text-3xl mt-4">Edit Book</h1>
      <div className="border-sky-400 p-4 rounded-xl flex flex-col border-2 mx-auto w-[600px]">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 border-gray-500 w-full py-2 px-4"
          ></input>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            className="border-2 border-gray-500 w-full py-2 px-4"
          ></input>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            value={publishYear}
            onChange={(e) => {
              setPublishYear(e.target.value);
            }}
            className="border-2 border-gray-500 w-full py-2 px-4"
          ></input>
        </div>
        <button
          onClick={handelEditBook}
          className=" m-8 bg-sky-400 text-black p-2 "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
