import SignInForm from "@components/Forms/SignInForm";
import React from "react";

const SignIn = () => {
  return (
    <div className="main border-2 border-black w-full h-full flex flex-row flex-wrap items-center justify-center gap-x-12 font-notosans">
      <SignInForm />
    </div>
  );
};

export default SignIn;
