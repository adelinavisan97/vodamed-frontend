import React, { useState } from "react";
import { signIn } from "../../authentication/auth-service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const SignInComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignIn = async () => {
        try {
            const response = await signIn(email, password);
            localStorage.setItem("authToken", response.token);
            login(response.token);
            // alert("Sign-in successful!");
            navigate("/");
            // Optionally, redirect the user or perform any other actions
            console.log(response);
        } catch (error) {
            console.error("Error signing in:", error);
            alert(
                "Sign-in failed. Please check your credentials and try again."
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side: Sign-in form */}
            <div className="w-full md:w-1/3 flex items-baseline justify-center pt-48">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                        Welcome Back!
                    </h2>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
                    />
                    <button
                        onClick={handleSignIn}
                        className="w-full bg-blue-300 text-blue-800 p-3 rounded hover:bg-blue-700 hover:text-white transition"
                    >
                        Sign In
                    </button>
                    <p className="mt-4 text-center text-base">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-blue-700 hover:underline"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>

            {/* Right side: Animation */}
            <div className="w-full md:w-2/3 hidden md:block bg-cover bg-center">
                <script
                    src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
                    type="module"
                ></script>

                <iframe
                    style={{ width: "80%", height: "80%" }}
                    src="https://lottie.host/embed/d24b228b-0af1-4719-ad84-aef34b5e0e12/3f7LvYMzXb.json"
                ></iframe>
            </div>
        </div>
    );
};

export default SignInComponent;
