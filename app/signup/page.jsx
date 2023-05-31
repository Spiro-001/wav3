import SignUpForm from "@components/Forms/SignUpForm";
import React from "react";

const SignUp = () => {
  return (
    <div className="main w-full h-full flex flex-row flex-wrap items-center justify-center gap-x-12">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
