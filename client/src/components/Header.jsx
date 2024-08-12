import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="flex font-serif justify-around items-center px-4 py-4 bg-black md:px-16 lg:px-32 xl:px-48 2xl:px-64">
      <Link
        to="/"
        className="flex gap-1 text-xl font-bold italic font-serif text-red-600 md:text-2xl lg:text-3xl"
      >
        <h1>
          TUF
          <span className="text-lg text-white font-sans md:text-xl lg:text-2xl">
            -flashcards
          </span>
        </h1>
      </Link>
      {user && (
        <Link
          to="/dashboard"
          className="w-24 px-2 py-1 text-lg border border-4 border-red-700 text-white bg-zinc-800 rounded-md text-center sm:min-w-28 sm:px-4 sm:py-1.5 lg:min-w-32 lg:px-4 lg:py-2"
        >
          Dashboard
        </Link>
      )}
      {!user && (
        <Link
          to="/login"
          className="w-24 px-2 py-1 text-lg border border-2 border-red-500 text-white bg-zinc-800 rounded-md text-center md:w-28 md:px-3 md:py-1.5 lg:w-32 lg:px-4 lg:py-2"
        >
          Admin
        </Link>
      )}
    </header>
  );
};

export default Header;
