import React from "react";

import SignUpComponent from "../components/authentication/SignUpComponent";

const SignUp = () => {
  return (
    <div className="p-10">
      <div className="flex justify-center items-center gap-x-4"></div>
      <div>
        <SignUpComponent />
      </div>
    </div>
  );
};

export default SignUp;
