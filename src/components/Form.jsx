import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../api/axios";
import { useGlobalContext } from "./Context/GlobalContext";

const API_LOGIN_URL = "/auth/login";

const Form = ({ errRef }) => {
  const { setErrMsg, setAuthAndPersist, persist, setPersist } =
    useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    errRef.current.focus();
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        API_LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = res?.data?.token;
      setAuthAndPersist({
        isLoggedIn: true,
        username,
        userId: res.data.user.id,
      });

      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  const togglePersist = () => setPersist((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        ref={userRef}
        type="text"
        name="username"
        placeholder="Enter your username"
        className="w-full bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-md text-black font-medium outline-none focus:ring-2 focus:ring-blue-400"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="w-full bg-gray-200 dark:bg-gray-700 dark:text-white p-3 rounded-md text-black font-medium outline-none focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />
      <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <span>Trust This Device?</span>
        </label>
        <Link
          to="/pages/reset"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full bg-blue dark:bg-blue  text-white dark:text-white p-3 rounded-md font-semibold transition duration-300"
      >
        Login Now
      </button>
    </form>
  );
};

export default Form;
