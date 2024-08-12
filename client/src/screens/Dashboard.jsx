import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get("/get-all-cards").then(({ data }) => {
      //console.log(data);
      setCards(data);
    });
  }, []);
  const logout = async (e) => {
    e.preventDefault();
    await axios.post("/logout");
    toast.success("Successfully logged-out!!Goodbye Admin!!");
    setUser(null);
    setRedirect("/");
  };
  const deleteCard = (id) => {
    axios
      .post("/delete-card", {
        id,
      })
      .then(() => {
        const newCards = cards.filter((card) => card.id !== id);
        setCards(newCards);
        toast.success("Flashcard deleted successfully");
      })
      .catch((err) => console.log(err));
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="p-8 min-h-screen w-full flex flex-col gap-4 font-serif bg-zinc-900 text-white">
        <div className="text-3xl font-bold">Dashboard</div>
        <hr className="border-white" />
        <div className="flex gap-2">
          <div className="w-20 h-20 rounded-full bg-red-500 bg-opacity-80 text-white flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-gray-400 text-sm mb-2">
              Currently signed-in as:{" "}
              <span className="font-bold text-xl text-white">{user?.name}</span>
            </h2>
            <button
              onClick={logout}
              className="px-2 py-1 rounded-md bg-blue-300 text-black"
            >
              Log-Out
            </button>
          </div>
        </div>
        <hr className="border-white" />
        <div className="mx-auto">
          <Link
            to="/new-card"
            className="flex gap-1 justify-center items-center w-80 px-2 py-1 text-lg border border-2 border-red-500 text-white bg-zinc-800 rounded-md md:px-3 md:py-1.5 lg:px-4 lg:py-2"
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
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {cards.map((card) => (
            <div key={card.id}>
              <section className="p-6 min-h-[30rem] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a>Q. {card.question}</a>
                </h1>
                <hr className="border-white" />
                <div
                  className="whitespace-pre-wrap text-white text-xl font-sans"
                  dangerouslySetInnerHTML={{ __html: card.answer }}
                />
                <div className="flex gap-2 justify-end mt-2">
                  <Link
                    to={"/new-card/" + card.id}
                    className="bg-white rounded-lg text-black w-8 h-8 flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  </Link>
                  <button
                    className="bg-white rounded-lg text-black w-8 h-8 flex justify-center items-center"
                    onClick={() => deleteCard(card.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
