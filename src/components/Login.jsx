// Login.jsx
import Header from "./Header";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.jsx";

const prettyFirebaseError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered. Try signing in instead.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 8 characters with a mix of letters, numbers, and symbols.";
    default:
      return "Something went wrong. Please try again.";
  }
};

// (Optional) subtle field highlight based on message text
const fieldFromMsg = (msg) => {
  if (!msg) return null;
  if (/email/i.test(msg)) return "email";
  if (/password/i.test(msg)) return "password";
  if (/name/i.test(msg)) return "name";
  return null;
};

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const clearInputs = () => {
    if (name.current) name.current.value = "";
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";
  };

  const handleToggleMode = () => {
    setIsSignIn((p) => !p);
    setErrMsg(null);
    setSuccessMsg(null);
    clearInputs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErrMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const nameVal = name.current?.value ?? "";
    const emailVal = email.current?.value ?? "";
    const passVal = password.current?.value ?? "";

    // clear inputs immediately on button click (as you wanted)
    clearInputs();

    const msg = checkValidData(isSignIn ? "signIn" : "signUp", nameVal, emailVal, passVal);
    if (msg) {
      setErrMsg(msg);
      setLoading(false);
      return;
    }

    try {
      if (!isSignIn) {
        // Sign Up
        const cred = await createUserWithEmailAndPassword(auth, emailVal, passVal);
        if (nameVal.trim()) {
          await updateProfile(cred.user, { displayName: nameVal.trim() });
        }
        // dispatch correct user info
        const user = cred.user; // ✅ THIS is the user, not `auth`
        dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        setSuccessMsg("Account created successfully.");
        navigate("/browse"); // ← remove if you don't want navigation
      } else {
        // Sign In
        const { user } = await signInWithEmailAndPassword(auth, emailVal, passVal);
        dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        setSuccessMsg("Signed in successfully.");
        navigate("/browse"); // ← remove if you don't want navigation
      }
    } catch (error) {
      setErrMsg(prettyFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const errorField = fieldFromMsg(errMsg);

  return (
    <div>
      {/* background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          className="h-full w-full object-cover brightness-80 scale-110"
          alt="Netflix Login"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/CA-en-20250908-TRIFECTA-perspective_05c96fb0-6001-4817-a234-4d345914e6cf_small.jpg"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative isolate min-h-screen">
        <Header />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-md absolute right-0 left-0 mx-auto mt-4 p-8 text-white bg-black/60 rounded-xl shadow-2xl"
        >
          <h1 className="font-bold text-3xl pb-4">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {/* Error banner */}
          {errMsg && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.516 11.586c.75 1.334-.213 2.997-1.742 2.997H3.483c-1.53 0-2.492-1.663-1.742-2.997L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold">We couldn’t complete that.</p>
                <p className="text-sm opacity-90">{errMsg}</p>
              </div>
              <button
                type="button"
                onClick={() => setErrMsg(null)}
                className="ml-2 rounded-md px-2 text-red-200 hover:text-white focus:outline-none"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {/* Success banner */}
          {successMsg && (
            <div
              role="status"
              aria-live="polite"
              className="mb-4 flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4 1.5 1.5L11 17l-3.5-3.5L9 12z" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold">{successMsg}</p>
                <p className="text-sm opacity-90">You’re authenticated. Continue in the app when ready.</p>
              </div>
              <button
                type="button"
                onClick={() => setSuccessMsg(null)}
                className="ml-2 rounded-md px-2 text-emerald-200 hover:text-white focus:outline-none"
                aria-label="Dismiss success"
              >
                ✕
              </button>
            </div>
          )}

          {!isSignIn && (
            <div className="mb-3">
              <label className="sr-only" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                ref={name}
                type="text"
                placeholder="Full name"
                autoComplete="name"
                onInput={() => errMsg && setErrMsg(null)}
                className={`p-4 w-full bg-black/60 placeholder-gray-400 ring-1 focus:ring-2 rounded-md outline-none ${
                  errorField === "name" ? "ring-red-500/60 focus:ring-red-400" : "ring-white/30 focus:ring-white/80"
                }`}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              ref={email}
              type="email"
              placeholder="Email"
              autoComplete="email"
              aria-invalid={errorField === "email"}
              onInput={() => errMsg && setErrMsg(null)}
              className={`p-4 w-full bg-black/60 placeholder-gray-400 ring-1 focus:ring-2 rounded-md outline-none ${
                errorField === "email" ? "ring-red-500/60 focus:ring-red-400" : "ring-white/30 focus:ring-white/80"
              }`}
            />
          </div>

          <div className="mb-4 relative">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              ref={password}
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              aria-invalid={errorField === "password"}
              onInput={() => errMsg && setErrMsg(null)}
              className={`p-4 w-full bg-black/60 placeholder-gray-400 ring-1 focus:ring-2 rounded-md outline-none pr-12 ${
                errorField === "password" ? "ring-red-500/60 focus:ring-red-400" : "ring-white/30 focus:ring-white/80"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute inset-y-0 right-3 my-auto h-9 px-2 rounded text-gray-300 hover:text-white focus:outline-none"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-red-600 hover:bg-red-700 transition-colors p-3 rounded-md w-full font-semibold flex items-center justify-center ${
              loading ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading && (
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 004 12z" />
              </svg>
            )}
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-gray-400 mt-4">
            {isSignIn ? "New to Netflix?" : "Already a member?"}{" "}
            <button
              type="button"
              onClick={handleToggleMode}
              className="font-bold text-white hover:underline"
            >
              {isSignIn ? "Sign up now." : "Sign in now."}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
