import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const NewCard = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  if (!user) {
    alert("Not logged in as admin!!");
    setRedirect("/");
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/get-card-by-id/" + id).then((response) => {
      const { data } = response;
      setQuestion(data.question);
      setAnswer(data.answer);
    });
  }, [id]);
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const createCard = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Kindly fill all the fields that have been marked as compulsory.");
      return;
    }
    try {
      await axios.post("/add-card", {
        question,
        answer,
      });
      toast.success("Flash Card creation successful");
      setQuestion("");
      setAnswer("");
      setRedirect("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Flash Card creation unsuccessful.");
    }
  };
  const editCard = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Kindly fill all the fields that have been marked as compulsory.");
      return;
    }
    try {
      await axios.put("/edit-card", {
        id,
        question,
        answer,
      });
      toast.success("Edit successful");
      setQuestion(question);
      setAnswer(answer);
    } catch (error) {
      console.error("Error:", error);
      alert("Edit unsuccessful.");
    }
  };
  return (
    <div className="p-8 w-full min-h-screen flex flex-col gap-4 bg-zinc-900 text-white font-serif">
      <h1 className="text-center text-2xl underline">
        Create Your Flashcard Here.
      </h1>
      <div className="w-full">
        <label className="self-start text-left mb-2 text-2xl" htmlFor="text">
          Question{"*"}
        </label>
        <input
          id="text"
          type="text"
          placeholder="Title of your blog"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full !p-2 border !border-white !rounded-none self-start text-left !bg-gray-700"
        />
      </div>

      <div className="w-full">
        <label className="self-start text-left mb-2 text-2xl" htmlFor="blog">
          Answer{"*"}
        </label>
        <ReactQuill
          id="blog"
          value={answer}
          onChange={setAnswer}
          className="w-full !p-2 border !border-white !rounded-none self-start text-left text-white"
        />
      </div>
      <div className="w-full">
        {!id && (
          <button
            onClick={createCard}
            className="bg-gray-700 text-white w-full p-2 flex gap-1 justify-center items-center border border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create New Card
          </button>
        )}
        {id && (
          <button
            onClick={editCard}
            className="bg-gray-700 text-lg text-white w-full p-2 flex gap-1 justify-center items-center border border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
            Edit Card
          </button>
        )}
      </div>
    </div>
  );
};

export default NewCard;
