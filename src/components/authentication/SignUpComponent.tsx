import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmSignUp, signUp } from "../../authentication/auth-service";

const SignUpComponent: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"signUp" | "confirm">("signUp");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUp(email, password, givenName, familyName);
      setStage("confirm");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await confirmSignUp(email, code);
      alert("Sign-up confirmed! You can now sign in.");
      navigate("/signin"); // Redirect to the sign-in page
    } catch (error) {
      console.error("Error confirming sign up:", error);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {stage === "signUp" ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Given Name"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Family Name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              onClick={handleSignUp}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Confirm Sign Up
            </h2>
            <input
              type="text"
              placeholder="Confirmation Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              onClick={handleConfirmSignUp}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpComponent;
