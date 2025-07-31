import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { useGlobalContext } from "./Context/GlobalContext";

const API_LOGIN_URL = "/auth/login";
const Form = ({ errRef }) => {
  const { setAuth, setErrMsg, setAuthAndPersist } = useGlobalContext();

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
          headers: {
            "Content-Type": "application/json",
          },
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
      console.error("Axios error:", error);

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <input
        type="text"
        name="username"
        ref={userRef}
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
        className="bg-gray-300 p-4 rounded-md w-full text-black font-semibold"
        value={username}
        autoComplete="true"
      />
      <input
        type="password"
        required
        placeholder="Password"
        className="bg-gray-300 p-4 rounded-md w-full text-black font-semibold"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        name="password"
        id="password"
      />

      <p className="text-gray-500 space-x-2 text-xl">
        <span>Forget Password?/</span>
        <Link
          href="/pages/register"
          className="text-xl text-black font-semibold"
        >
          Reset
        </Link>
      </p>
      <div className="pt-16">
        <button
          type="submit"
          className="w-full bg-blue text-white font-semibold rounded-lg border-none p-4 text-center"
        >
          Login Now
        </button>
      </div>
    </form>
  );
};

export default Form;
