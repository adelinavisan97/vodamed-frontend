// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import SignInComponent from "./components/authentication/SIgnInComponent";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { AuthProvider } from "./components/authentication/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PrescriptionAllocation from "./pages/prescriptionAllocation";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <Menu />
                <Routes>
                    <Route
                        path="/"
                        element={<ProtectedRoute element={<Dashboard />} />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignInComponent />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/prescriptions/allocate"
                        element={<PrescriptionAllocation />}
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
};

export default App;
