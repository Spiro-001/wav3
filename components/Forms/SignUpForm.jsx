"use client";

import gsap from "gsap";
import DOBDropdown from "./DOBDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import postNewUser from "@utils/fetch/post/signup/postNewUser";
import patchConnectUserToWav from "@utils/fetch/patch/signup/patchConnectUserToWav";
import postUsernameValid from "@utils/fetch/post/signup/postUsernameValid";

const SignUpForm = (props, { link }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [provider, setProvider] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [alreadyTakenUsername, setAlreadyTakenUsername] = useState([]);
  const [alreadyTakenEmail, setAlreadyTakenEmail] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [inputUsernameFocus, setUsernameInputFocus] = useState(false);
  const [inputEmailFocus, setEmailInputFocus] = useState(false);
  const [inputPasswordFocus, setPasswordInputFocus] = useState(false);
  const [inputConfirmPasswordFocus, setConfirmPasswordInputFocus] =
    useState(false);

  const [displayUsernameLength, setDisplayUsernameLength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    month: "",
    day: "",
    year: "",
  });

  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();

  const timelineUsername = useRef();
  const timelineEmail = useRef();
  const timelinePassword = useRef();
  const timelineConfirmPassword = useRef();
  const timelinePasswordStrengthBar = useRef();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const passwordStrengthBarRef = useRef();
  const passwordStrengthRef = useRef(0);

  const splashRef = useRef();

  useEffect(() => {
    timelineUsername.current = gsap.timeline({ paused: true });
    timelineEmail.current = gsap.timeline({ paused: true });
    timelinePassword.current = gsap.timeline({ paused: true });
    timelineConfirmPassword.current = gsap.timeline({ paused: true });
    timelinePasswordStrengthBar.current = gsap.timeline({ paused: true });

    usernameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const colorBar = [
      "black",
      "rgb(255, 40, 40)",
      "rgb(255, 255, 60)",
      "rgb(32, 230, 72)",
    ];
    gsap
      .fromTo(
        passwordStrengthBarRef.current,
        {
          width: (passwordStrengthRef.current / 3) * 100 + "%",
          borderColor: colorBar[passwordStrengthRef.current],
        },
        {
          width: (passwordStrength / 3) * 100 + "%",
          borderColor: colorBar[passwordStrength],
          duration: 0.8,
          ease: "power2.out",
        }
      )
      .play();
    passwordStrengthRef.current = passwordStrength;
  }, [passwordStrength]);

  const handleFormSubmit = async () => {
    try {
      debugger;
      const response = await postNewUser(
        props,
        username,
        email,
        month,
        day,
        year,
        password,
        confirmPassword
      );
      const patchResponse = await patchConnectUserToWav(searchParams, response);
      signIn("credentials", { ...response, password, callbackUrl: "/" });
    } catch (error) {
      setFormStep(1);
    }
  };

  const handleNextStep = (event) => {
    event.preventDefault();
    timelineUsername.current
      .to(usernameRef.current, {
        clearProps: "all",
        duration: 0,
      })
      .play();
    timelineEmail.current
      .to(emailRef.current, {
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
    timelineConfirmPassword.current
      .to(confirmPasswordRef.current, {
        clearProps: "all",
        duration: 0,
      })
      .play();
    props.link ? setFormStep(3) : setFormStep((prevStep) => prevStep + 1);
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
      case "email":
        setEmail(target.value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: false,
        }));
        break;
      case "password":
        setPassword(target.value);
        const mediumRegex = new RegExp(
          "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
        );
        const strongRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        if (target.value.length === 0) setPasswordStrength(0);
        else if (strongRegex.test(target.value)) setPasswordStrength(3);
        else if (mediumRegex.test(target.value)) setPasswordStrength(2);
        else setPasswordStrength(1);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: false,
        }));
        break;
      case "confirm-password":
        setConfirmPassword(target.value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: false,
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

  const handleUsernameBlurInput = async (ref) => {
    const usernameRegex = new RegExp("^[a-zA-Z0-9_-]{3,25}$");
    if (alreadyTakenUsername.includes(username.toLowerCase())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is already taken.",
      }));
    } else {
      const usernameAvailable = await postUsernameValid(username);
      if (usernameAvailable) {
        setAlreadyTakenUsername((prev) => [...prev, username.toLowerCase()]); // REDUCE SAME USERNAME FETCH CALLS
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username is already taken.",
        }));
      }
    }
    setDisplayUsernameLength(false);

    if (username.length === 0) {
      if (errors.username !== "")
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "What's your name?",
        }));
      setUsernameInputFocus(false);
      timelineUsername.current.reverse(0.2);
    } else if (username.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username must be at least 3 characters long.",
      }));
    } else if (!usernameRegex.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username contains unpermitted characters.",
      }));
    }
  };

  const handleEmailFocusInput = (ref) => {
    if (!inputEmailFocus) {
      timelineEmail.current
        .to(ref.current, {
          top: 4,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          duration: 0.2,
        })
        .play();
      setEmailInputFocus(true);
    }
  };

  const handleEmailBlurInput = async (ref) => {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (alreadyTakenEmail.includes(email.toLowerCase())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is already in use.",
      }));
    } else {
      const emailAvailable = await postUsernameValid(email);
      if (emailAvailable) {
        setAlreadyTakenEmail((prev) => [...prev, email.toLowerCase()]); // REDUCE SAME USERNAME FETCH CALLS
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is already in use.",
        }));
      }
    }

    if (!email.match(emailRegEx) && errors.email !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email.",
      }));
    }
    if (email.length === 0) {
      setEmailInputFocus(false);
      timelineEmail.current.reverse(0.2);
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
      if (errors.password !== "")
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: false,
        }));
      setPasswordInputFocus(false);
      timelinePassword.current.reverse(0.2);
    }
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: false,
      }));
    }
  };

  const handleConfirmPasswordFocusInput = (ref) => {
    if (!inputConfirmPasswordFocus) {
      timelineConfirmPassword.current
        .to(ref.current, {
          top: 4,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          duration: 0.2,
        })
        .play();
      setConfirmPasswordInputFocus(true);
    }
  };

  const handleConfirmPasswordBlurInput = (ref) => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordInputFocus(false);
      timelineConfirmPassword.current.reverse(0.2);
    }
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    }
  };

  const returnFormByStep = () => {
    switch (formStep) {
      case 1:
        return (
          <>
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
                  Username
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
            {!props.link && (
              <div className="flex flex-col">
                <label
                  className={`relative flex items-center px-4 pt-2 pb-1 rounded-md border-2 ${
                    errors.email
                      ? "border-red-600"
                      : inputEmailFocus
                      ? "border-blue-500"
                      : "border-gray-200"
                  } box-border w-full`}
                >
                  <span
                    className={`email absolute text-xl hover:cursor-text ${
                      errors.email && inputEmailFocus
                        ? "text-red-600"
                        : inputEmailFocus
                        ? "text-blue-600"
                        : "text-black"
                    }`}
                    ref={emailRef}
                  >
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onFocus={() => handleEmailFocusInput(emailRef)}
                    onBlur={() => handleEmailBlurInput(emailRef)}
                    onChange={handleFormInput}
                    id="email"
                    className="form-input w-full max-w-md pt-4 h-fit text-lg"
                  />
                </label>
                <span className="text-red-600 text-xs relative left-2 font-semibold">
                  {errors.email}
                </span>
              </div>
            )}
            <label className="flex flex-col mb-12">
              <span className="font-bold">Date of birth</span>
              <span className="text-sm text-gray-500 pb-4">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, or something else.
              </span>
              <DOBDropdown
                month={month}
                setMonth={setMonth}
                day={day}
                setDay={setDay}
                year={year}
                setYear={setYear}
              />
            </label>
            <button
              onClick={handleNextStep}
              className="next-button mx-auto py-2 px-36 w-2/3 flex justify-center rounded-full font-bold text-lg mt-auto disabled:bg-gray-200 disabled:cursor-not-allowed bg-sky-100 whitespace-nowrap"
              disabled={
                !(
                  username &&
                  (props.link || email) &&
                  month &&
                  day &&
                  year &&
                  !errors.username &&
                  !errors.email
                )
              }
            >
              {props.link ? "Link account" : "Next"}
            </button>
          </>
        );
      case 2:
        return (
          <>
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
              <div className="w-60 flex relative top-2 left-2 h-1">
                <span className="text-xs absolute left-0 font-semibold border-2 w-full rounded"></span>
                <span
                  className="text-xs absolute left-0 font-semibold border-2 border-black rounded"
                  ref={passwordStrengthBarRef}
                ></span>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className={`relative flex items-center px-4 pt-2 pb-1 rounded-md border-2 ${
                  errors.confirmPassword
                    ? "border-red-600"
                    : inputConfirmPasswordFocus
                    ? "border-blue-500"
                    : "border-gray-200"
                } box-border w-full`}
              >
                <span
                  className={`absolute text-xl hover:cursor-text ${
                    errors.confirmPassword && inputConfirmPasswordFocus
                      ? "text-red-600"
                      : inputConfirmPasswordFocus
                      ? "text-blue-600"
                      : "text-black"
                  }`}
                  ref={confirmPasswordRef}
                >
                  Confirm password
                </span>
                <input
                  value={confirmPassword}
                  onFocus={() =>
                    handleConfirmPasswordFocusInput(confirmPasswordRef)
                  }
                  onBlur={() =>
                    handleConfirmPasswordBlurInput(confirmPasswordRef)
                  }
                  onChange={handleFormInput}
                  id="confirm-password"
                  className="form-input w-full max-w-md pt-4 h-fit text-lg"
                  ref={confirmPasswordInputRef}
                  type="password"
                />
              </label>
              <span className="text-red-600 text-xs relative left-2 font-semibold">
                {errors.confirmPassword}
              </span>
            </div>
            <button
              onClick={handleNextStep}
              className="next-button  w-2/3 flex justify-center mx-auto py-2 px-36 rounded-full font-bold text-lg mt-auto disabled:bg-gray-200 disabled:cursor-not-allowed bg-sky-100 whitespace-nowrap"
              disabled={
                !(
                  password &&
                  confirmPassword &&
                  passwordStrength > 1 &&
                  !errors.confirmPassword &&
                  !errors.password &&
                  password === confirmPassword
                )
              }
            >
              Create account
            </button>
          </>
        );
      case 3:
        handleFormSubmit();
        return (
          <div className="h-full w-full flex justify-center items-center">
            <Image
              src="/GIF/loading.gif"
              width={48}
              height={48}
              alt="loading"
            />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="flex flex-row sm:h-2/3 h-full shadow-md">
      <form
        onSubmit={handleFormSubmit}
        className="sign-up-f text-black bg-white flex flex-col sm:w-fit relative px-4 sm:px-10 py-10 gap-y-4 sm:max-w-lg h-full border-white border-2"
      >
        <span className="font-bold text-2xl">
          {props.link ? "Link" : "Create"} your{" "}
          {props.link && (
            <span className="capitalize">{searchParams.get("provider")}</span>
          )}{" "}
          account
        </span>
        {returnFormByStep()}
      </form>
    </div>
  );
};

export default SignUpForm;
