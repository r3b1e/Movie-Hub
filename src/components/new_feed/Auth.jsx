import React, { useRef, useState } from "react";
import { emailRegex, passwordRegex } from "../utils/Regix";
import bgImage from '../../assets/movieHubjpg.jpg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Auth = () => {
  const [sign, setSign] = useState(true);
  const [error, setError] = useState("");

  const email = useRef(null);
  const name = useRef(null);
  const pass = useRef(null);

  const handleClick = () => {
    const Email = email.current.value;
    const Password = pass.current.value;
    if (!emailRegex.test(Email)) {
      setError("Invalid email");
      return;
    } else if (!passwordRegex.test(Password)) {
      setError("Invalid password");
      return;
    } else {
      setError("");
    }
    // if (Email && Password) {
    //   console.log("Return condition");
    //   return;
    // }
    if (sign) {
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          const user = userCredential.user;

          console.log("User created:", user);
        })
        .catch((error) => {
          setError(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed in", user);
        })
        .catch((error) => {
          setError(error.code + " - " + error.message);
        });
    }
    console.log(emailRegex.test(Email));
    console.log();
  };

  return (
    <div style={{backgroundImage: `url(${bgImage})`}} className="bg-no-repeat bg-center bg-cover h-screen w-full flex justify-center items-center">
      <div className="flex gap-3 items-center absolute top-0 left-0 m-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgba(2,119,127,1)"
        className="h-6"
      >
        <path d="M15.4142 4.99998H21.0082C21.556 4.99998 22 5.44461 22 6.00085V19.9991C22 20.5519 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5553 2 19.9991V6.00085C2 5.44808 2.45531 4.99998 2.9918 4.99998H8.58579L6.05025 2.46445L7.46447 1.05023L11.4142 4.99998H12.5858L16.5355 1.05023L17.9497 2.46445L15.4142 4.99998Z"></path>
      </svg>
      <h2 className="text-2xl font-semibold">Movie Hub</h2>
      </div>
      <div className="bg-black w-100 h-fit opacity-80 p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-white text-4xl font-bold mb-5">Sign In</h1>
          {sign && (
            <input
              ref={name}
              type="text"
              name="username"
              className="bg-zinc-800 rounded w-full py-2 px-4 my-2 text-zinc-100 "
              placeholder="Enter user name"
            />
          )}
          <input
            ref={email}
            type="text"
            name="email"
            className="bg-zinc-800 rounded w-full py-2 px-4 my-2 text-zinc-100"
            placeholder="Enter your email"
          />
          <input
            ref={pass}
            type="password"
            name="password"
            className="bg-zinc-800 rounded w-full py-2 px-4 my-2 text-zinc-100"
            placeholder="Enter password"
          />
          <button
            onClick={handleClick}
            className="cursor-pointer w-full bg-red-600 text-white font-medium rounded py-1.5 my-2"
          >
            {!sign ? "Sign In" : "Sign Up"}
          </button>
          {error && <p className="text-red-600 text-xs">{error}</p>}
          {sign ? (
            <p className="text-white text-sm my-2">
              already register, please{" "}
              <span
                onClick={() => {
                  setSign(false);
                }}
                className="hover:text-red-400 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          ) : (
            <p className="text-white text-sm my-2">
              new user, please{" "}
              <span
                onClick={() => {
                  setSign(true);
                }}
                className="hover:text-red-400 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
