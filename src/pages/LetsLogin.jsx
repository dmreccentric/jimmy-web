import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useGlobalContext } from "../hooks/GlobalContext";

const LetsLogin = () => {
  const { errMsg, auth, isVerifying } = useGlobalContext();
  const errRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerifying && auth?.isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [auth, isVerifying]);

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <p
          ref={errRef}
          className={`${
            errMsg
              ? "bg-red-500 text-white font-bold p-3 mb-4 rounded"
              : "absolute -left-full"
          }`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-3xl font-bold text-center mb-4 text-blue dark:text-white">
          Hey, Login Now!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Don't have an account?{" "}
          <Link
            to="/admin/register"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Create New
          </Link>
        </p>
        <Form errRef={errRef} />
      </div>
    </section>
  );
};

export default LetsLogin;
