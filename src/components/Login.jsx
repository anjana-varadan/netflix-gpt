import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignUpForm = () => {
    setIsSignIn(!isSignIn);
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

      <form className="w-5/13 absolute p-14 my-25 mx-auto right-0 left-0 text-white bg-black/70">
        <h1 className="font-bold text-3xl py-4 px-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Enter Full Name"
            className="p-4 m-2 w-full border-0 ring-[0.2px] ring-white rounded-sm"
          />
        )}

        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 m-2 w-full border-0 ring-[0.2px] ring-white rounded-sm"
        />
        
        <input
          type="password"
          placeholder="Password"
          className="p-4 m-2 w-full border-0 ring-[0.2px] ring-white rounded-sm"
        />
        <button className="bg-red-600 p-2 m-6 mx-2 rounded w-full">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

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
