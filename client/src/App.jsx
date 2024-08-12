import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./UserContext";
import Home from "./screens/Home";
import axios from "axios";
import Dashboard from "./screens/Dashboard";
import LoginPage from "./components/LoginPage";
import NewCard from "./screens/NewCard";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/new-card"} element={<NewCard />} />
          <Route path={"/new-card/:id"} element={<NewCard />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
