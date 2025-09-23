import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate.jsx";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errMsg, setErrMsg] = useState(null);

  const handleSignUpForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleBtnClick = () => {
    //validate form data
    const msg = checkValidData(
      isSignIn ? "signIn" : "signUp",
      name.current?.value ?? "",
      email.current.value,
      password.current.value
    );
    setErrMsg(msg);
  };
  return (
    <div>
      <Header />
      <div className="absolute overflow-hidden ">
        <img
          className="object-cover brightness-50 scale-140 w-screen transform-gpu"
          alt="Netflix Login"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/CA-en-20250908-TRIFECTA-perspective_05c96fb0-6001-4817-a234-4d345914e6cf_small.jpg"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-5/13 absolute p-14 my-25 mx-auto right-0 left-0 text-white bg-black/70"
      >
        <h1 className="font-bold text-3xl py-4 px-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Enter Full Name"
            className="p-4 m-2 w-full border-0 ring-[0.2px] ring-white rounded-sm"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 m-2 w-full border-0 ring-[0.2px] ring-white rounded-sm"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 m-2 w-full border-0 ring-[0.2px] ring-white rounded-sm"
        />
        <button
          className="bg-red-600 p-2 m-6 mx-2 rounded w-full cursor-pointer"
          onClick={handleBtnClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 text-red-500">{errMsg}</p>

        <p
          className="text-gray-400 px-2 my-2 cursor-pointer"
          onClick={handleSignUpForm}
        >
          {isSignIn ? "New to Netflix?" : "Already a member? "}
          <span className="font-bold text-white">
            {isSignIn ? " Sign Up now." : " Sign In now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
