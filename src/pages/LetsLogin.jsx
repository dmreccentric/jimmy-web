import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useGlobalContext } from "../hooks/GlobalContext";
import { useRef } from "react";

const LetsLogin = () => {
  const { errMsg } = useGlobalContext();
  const errRef = useRef();

  const { auth, isVerifying } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerifying && auth?.isLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [auth, isVerifying]);

  return (
    <div className="mx-8 mt-[40%]  space-y-10">
      <p
        ref={errRef}
        className={
          errMsg
            ? "bg-blue text-white font-bold p-[0.5rem] mb-[0.5rem]"
            : "absolute -left-full"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-5xl font-serif ">
        Hey, <br /> Login Now!
      </h1>
      <p className="text-gray-500 space-x-2 text-xl">
        <span>Dont have an account?/</span>
        <Link
          href="../pages/register"
          className="text-xl text-black font-semibold"
        >
          Create New
        </Link>
      </p>
      <Form errRef={errRef} />
    </div>
  );
};

export default LetsLogin;
