/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { postLogin } from "../constants/api";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";

const Login = () => {
  const { isAuth } = useAuth();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email && password) {
      setLoading(true);
      try {
        const res = await postLogin({ email, password });
        if (res && res.message === "Login succussfully") {
          setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
          setRedirectToReferrer(true);
        }
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill the required fields");
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (user && isAuth) {
      setRedirectToReferrer(true);
    }
  }, [user, isAuth]);

  if (redirectToReferrer === true) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container px-6 h-screen mx-auto flex justify-center items-center w-full">
      <div className="max-w-[417px] w-full">
        <form onSubmit={onSubmit}>
          <div>
            <h1 className="font-bold text-primary text-4xl">Login</h1>
            <p className="text-gray mt-2 mb-5 text-[18px]">
              login to your account
            </p>
          </div>
          <div className="">
            <p className="text-black mb-2 text-[18px]">Email</p>
            <input
              type="email"
              name="email"
              className=" px-6 py-2 bg-white border-gray rounded-[10px] outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mt-4">
            <p className="text-black mb-2 text-[18px]">Password</p>
            <input
              className="px-6 py-2 bg-white border-gray rounded-[10px] outline-none w-full"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-4 bottom-3 bg-none"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.29 11.098a.833.833 0 01-1.58-.528c-.017.05 0-.002 0-.002.03-.091.064-.181.103-.27.067-.158.165-.376.3-.635A9.193 9.193 0 013.446 7.77C4.725 6.378 6.813 5 10 5c3.188 0 5.276 1.378 6.551 2.77.681.747 1.233 1.6 1.634 2.528.033.079.058.142.075.189.006.013.023.1.04.183.015.077.028.15.033.163 0 0 .14.555-.57.79a.833.833 0 01-1.053-.523v-.005l-.012-.027a6.103 6.103 0 00-.287-.626 7.46 7.46 0 00-1.088-1.545c-1.017-1.109-2.678-2.23-5.323-2.23-2.645 0-4.307 1.121-5.324 2.23a7.461 7.461 0 00-1.325 2.041 3.684 3.684 0 00-.05.13l-.011.03z"
                  fill="#5C5C5C"
                />
                <path
                  d="M6.666 11.667a3.333 3.333 0 116.667 0 3.333 3.333 0 01-6.667 0z"
                  fill="#5C5C5C"
                />
              </svg>
            </button>
          </div>
          <p className="text-red text-xs mb-2 pl-2 block">{error}</p>
          <button
            disabled={loading}
            className="mt-10 submit-btn"
            onClick={() => null}
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
