// Header.jsx
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() =>{} )
      .catch(() => navigation("/error"));
  };

    useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigation("/browse");
      } else {
        dispatch(removeUser());
        navigation("/");
      }
    });
    
    return unsub; // <-- cleanup
  }, []);


  // show displayName if set; else fall back to email prefix
  const nameToShow =
    user?.displayName?.trim() || (user?.email ? user.email.split("@")[0] : "");

  return (
    <div className="bg-gradient-to-b from-black/60 flex justify-between">
      <img
        className="w-48"
        alt="Netflix Logo"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-751d-8fbc-b84325ea3035/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />

      {user?.uid && (
        <div className="flex  items-center gap-4 pr-4">
          {/* NEW: user name */}
          <span className="inline-flex items-center gap-2 text-black text-md font-medium">
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30"
            />
            Hi {nameToShow}!
          </span>

          <img
            className="w-10 h-10 rounded-sm cursor-pointer "
            alt="User Icon"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            title={nameToShow}
          />

          <button
            className="inline-flex items-center gap-2 rounded-md
                       bg-red-600 px-3 py-1.5 text-sm font-semibold text-white
                       hover:bg-red-700
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300
                       focus-visible:ring-offset-2 focus-visible:ring-offset-black
                       active:scale-[0.98]
                       transition-colors transition-transform"
            title="Sign out"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
