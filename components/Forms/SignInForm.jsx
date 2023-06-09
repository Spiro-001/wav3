"use client";

import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logIn } from "@redux/features/userSlice";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [providers, setProviders] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [inputUsernameFocus, setUsernameInputFocus] = useState(false);
  const [inputPasswordFocus, setPasswordInputFocus] = useState(false);

  const [displayUsernameLength, setDisplayUsernameLength] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const timelineUsername = useRef();
  const timelinePassword = useRef();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    timelineUsername.current = gsap.timeline({ paused: true });
    timelinePassword.current = gsap.timeline({ paused: true });
    usernameInputRef.current?.focus();

    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();

    switch (searchParams.get("error")) {
      case "401":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password does not match the account.",
        }));
        break;
      case "404":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Account does not exist.",
        }));
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (username.includes("@")) {
        const userInfo = { email: username, password: password };
        signIn("credentials", { ...userInfo, callbackUrl: "/feed" });
      } else {
        const userInfo = { username: username, password: password };
        signIn("credentials", { ...userInfo, callbackUrl: "/feed" });
      }
    } catch (error) {
      console.log("Could not find an account", error);
    } finally {
      timelineUsername.current
        .to(usernameRef.current, {
          clearProps: "all",
          duration: 0,
        })
        .play();
      timelinePassword.current
        .to(passwordRef.current, {
          clearProps: "all",
          duration: 0,
        })
        .play();
    }
  };

  const handleFormInput = (event) => {
    const { target } = event;
    switch (target.id) {
      case "username":
        setUsername(target.value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: false,
        }));
        break;
      case "password":
        setPassword(target.value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: false,
        }));
        break;
      default:
        break;
    }
  };

  const handleUsernameFocusInput = (ref) => {
    setDisplayUsernameLength(true);
    if (!inputUsernameFocus) {
      timelineUsername.current
        .to(ref.current, {
          top: 4,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          duration: 0.2,
        })
        .play();
      setUsernameInputFocus(true);
    }
  };

  const handleUsernameBlurInput = (ref) => {
    setDisplayUsernameLength(false);
    if (username.length === 0) {
      setUsernameInputFocus(false);
      timelineUsername.current.reverse(0.2);
    }
  };

  const handlePasswordFocusInput = (ref) => {
    if (!inputPasswordFocus) {
      timelinePassword.current
        .to(ref.current, {
          top: 4,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          duration: 0.2,
        })
        .play();
      setPasswordInputFocus(true);
    }
  };

  const handlePasswordBlurInput = (ref) => {
    if (password.length === 0) {
      setPasswordInputFocus(false);
      timelinePassword.current.reverse(0.2);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: false,
    }));
  };

  const returnFormByStep = () => {
    return (
      <>
        <span className="font-bold text-2xl">Login</span>
        <div className="flex flex-col">
          <label
            className={`relative flex items-center px-4 pt-2 pb-1 rounded-md border-2 ${
              errors.username
                ? "border-red-600"
                : inputUsernameFocus
                ? "border-blue-500"
                : "border-gray-200"
            } box-border w-full`}
          >
            <span
              className={`username absolute text-xl hover:cursor-text ${
                errors.username && inputUsernameFocus
                  ? "text-red-600"
                  : inputUsernameFocus
                  ? "text-blue-600"
                  : "text-black"
              }`}
              ref={usernameRef}
            >
              Username or email
            </span>
            <span className="absolute right-4 top-1 text-sm">
              {displayUsernameLength && `${username.length} / 25`}
            </span>
            <input
              value={username}
              maxLength={25}
              onFocus={() => handleUsernameFocusInput(usernameRef)}
              onBlur={() => handleUsernameBlurInput(usernameRef)}
              onChange={handleFormInput}
              id="username"
              className="form-input w-full max-w-md pt-4 h-fit text-lg"
              ref={usernameInputRef}
            />
          </label>
          <span className="text-red-600 text-xs relative left-2 font-semibold">
            {errors.username}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            className={`relative flex items-center px-4 pt-2 pb-1 rounded-md border-2 ${
              errors.password
                ? "border-red-600"
                : inputPasswordFocus
                ? "border-blue-500"
                : "border-gray-200"
            } box-border w-full`}
          >
            <span
              className={`absolute text-xl hover:cursor-text ${
                errors.password && inputPasswordFocus
                  ? "text-red-600"
                  : inputPasswordFocus
                  ? "text-blue-600"
                  : "text-black"
              }`}
              ref={passwordRef}
            >
              Password
            </span>
            <input
              value={password}
              onFocus={() => handlePasswordFocusInput(passwordRef)}
              onBlur={() => handlePasswordBlurInput(passwordRef)}
              onChange={handleFormInput}
              id="password"
              className="form-input w-full max-w-md pt-4 h-fit text-lg"
              ref={passwordInputRef}
              type="password"
            />
          </label>
          <span className="text-red-600 text-xs relative left-2 font-semibold">
            {errors.password}
          </span>
        </div>
        <div className="mx-auto mt-auto w-full flex flex-col gap-y-4">
          <button
            onClick={handleFormSubmit}
            className="next-button w-full py-2 px-36 rounded-full font-bold text-lg disabled:bg-gray-200 disabled:cursor-not-allowed bg-sky-100"
            disabled={
              !(username && password && !errors.username && !errors.password)
            }
          >
            Login
          </button>
          {providers &&
            Object.keys(providers).map((provider) => {
              if (provider === "credentials") return null;
              return (
                <button
                  key={provider}
                  onClick={(event) => {
                    event.preventDefault();
                    signIn(provider, {
                      callbackUrl: `/verify?account_connected=${provider}`,
                    });
                  }}
                  className="next-button flex items-center justify-center gap-x-2 w-full mx-auto py-2 px-36 rounded-full h-fit font-bold text-lg mt-auto disabled:bg-gray-200 disabled:cursor-not-allowed bg-sky-100"
                >
                  <Image
                    src={`/ProviderLogo/${provider}.svg`}
                    width={16}
                    height={16}
                    alt={provider}
                  />
                  <span className="whitespace-nowrap">
                    Sign in with {provider}
                  </span>
                </button>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <div className="w-fit flex flex-row sm:h-2/3 h-full shadow-md">
      <form
        onSubmit={handleFormSubmit}
        className="sign-up-f text-black bg-white flex flex-col sm:w-fit relative px-4 sm:px-10 py-10 gap-y-4 sm:max-w-lg h-full border-white border-2"
      >
        {returnFormByStep()}
      </form>
    </div>
  );
};

export default SignInForm;
