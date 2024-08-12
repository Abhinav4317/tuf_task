import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      setUser(data);
      toast.success("Login successful");
      setRedirect(true);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login unsuccessful. Please check your credentials.");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen w-full flex pt-2 justify-center bg-black font-serif">
      <div className="flex justify-center h-2/3 mt-4 w-4/5">
        <div className="flex flex-col gap-2 items-center bg-white p-6 w-1/3 rounded-lg shadow-lg border border-2 border-secondary">
          <h1 className="text-black text-2xl font-bold">
            <span className="text-secondary text-3xl italic font-serif">
              TUF
            </span>
            -flashcards
          </h1>
          <h1 className="font-serif text-xl font-bold">
            Verify you{"'"}re an admin
          </h1>
          <div className="w-full mb-2">
            <label className="self-start text-left mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="text"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full mb-2">
            <label className="self-start text-left mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full mb-1">
            <button
              onClick={login}
              className="bg-black text-white py-2 px-3 w-full rounded-full"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
