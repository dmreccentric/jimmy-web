import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("✅ Registered:", JSON.stringify(response?.data));
      setSuccess(true);
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      console.error("❌ Register error:", err.response?.data);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or email already taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {success ? (
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Success!
            </h1>
            <p>
              <Link to="/" className="text-blue-600 underline">
                Sign In
              </Link>
            </p>
          </div>
        ) : (
          <>
            <p
              ref={errRef}
              className={`${
                errMsg
                  ? "bg-red-200 text-red-700 font-bold p-2 mb-4 rounded"
                  : "sr-only"
              }`}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Register
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                >
                  Username:
                  {validName && <FaCheck className="text-green-500" />}
                  {!validName && user && <FaTimes className="text-red-500" />}
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p
                  className={`${
                    userFocus && user && !validName
                      ? "text-xs rounded bg-black text-white p-2 mt-1"
                      : "sr-only"
                  }`}
                >
                  <FaInfoCircle className="mr-1 inline" /> 4 to 24 characters.
                  Must begin with a letter.
                </p>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                >
                  Email:
                  {validEmail && <FaCheck className="text-green-500" />}
                  {!validEmail && email && <FaTimes className="text-red-500" />}
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p
                  className={`${
                    emailFocus && email && !validEmail
                      ? "text-xs rounded bg-black text-white p-2 mt-1"
                      : "sr-only"
                  }`}
                >
                  <FaInfoCircle className="mr-1 inline" /> Must be a valid email
                  address.
                </p>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                >
                  Password:
                  {validPwd && <FaCheck className="text-green-500" />}
                  {!validPwd && pwd && <FaTimes className="text-red-500" />}
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p
                  className={`${
                    pwdFocus && !validPwd
                      ? "text-xs rounded bg-black text-white p-2 mt-1"
                      : "sr-only"
                  }`}
                >
                  <FaInfoCircle className="mr-1 inline" /> 8–24 chars. Include
                  uppercase, lowercase, number & special character.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm_pwd"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                >
                  Confirm Password:
                  {validMatch && matchPwd && (
                    <FaCheck className="text-green-500" />
                  )}
                  {!validMatch && matchPwd && (
                    <FaTimes className="text-red-500" />
                  )}
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p
                  className={`${
                    matchFocus && !validMatch
                      ? "text-xs rounded bg-black text-white p-2 mt-1"
                      : "sr-only"
                  }`}
                >
                  <FaInfoCircle className="mr-1 inline" /> Must match the
                  password field.
                </p>
              </div>

              <button
                disabled={!validName || !validEmail || !validPwd || !validMatch}
                className={`w-full py-2 px-4 rounded font-bold text-white ${
                  !validName || !validEmail || !validPwd || !validMatch
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue "
                }`}
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Already registered?{" "}
              <Link to="/admin" className="text-blue-600 underline">
                Sign In
              </Link>
            </p>
          </>
        )}
      </section>
    </div>
  );
};

export default Register;
