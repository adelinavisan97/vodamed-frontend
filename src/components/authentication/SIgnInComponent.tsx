import React, { useEffect, useState } from "react";
import { signIn } from "../../authentication/auth-service";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./authContext";

const SignInComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleSignIn = async () => {
        try {
            const response = await signIn(email, password);
            localStorage.setItem("authToken", response.token);
            login(response.token);
            // alert("Sign-in successful!");
            localStorage.setItem("userId", response.userId);
            console.log(localStorage.getItem("userId"));
            // navigate("/dashboard");
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
            <div className="w-full md:w-1/2 flex items-start md:items-center justify-center md:justify-center md:mt-[-20vh]">
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
                        <Link
                            to="/signup"
                            className="text-blue-700 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side: Animation */}
            <div className="w-full md:w-2/3 flex items-center justify-center md:justify-end md:block mt-8 md:mt-0">
                <script
                    src="https://lottie.host/embed/3980b60b-f7ca-4417-9c67-a90822a78a8e/Y7DeErVRdj.json"
                    type="module"
                ></script>

                <iframe
                    className="w-full h-full md:w-3/4 md:h-3/4"
                    src="https://lottie.host/embed/3980b60b-f7ca-4417-9c67-a90822a78a8e/Y7DeErVRdj.json"
                    title="Animation"
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
    );
};

export default SignInComponent;
