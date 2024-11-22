// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SignInComponent from "./components/authentication/SIgnInComponent";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { AuthProvider } from "./components/authentication/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PrescriptionAllocation from "./pages/PrescriptionAllocation";
import PrescriptionReview from "./pages/PrescriptionReview";
import Medications from "./pages/Medications";
import Chatbox from "./components/ChatbotComponent";
import MedicineDetails from "./components/MedicationDetailsComponent";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <Menu />
                <Routes>
                    <Route
                        path="/dashboard"
                        element={<ProtectedRoute element={<Dashboard />} />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignInComponent />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/medicine/:id" element={<MedicineDetails />} />
                    <Route
                        path="/prescriptions/allocate"
                        element={<PrescriptionAllocation />}
                    />
                    <Route
                        path="/prescriptions/review"
                        element={<PrescriptionReview />}
                    />
                    <Route path="/medications" element={<Medications />} />
                </Routes>
                <Chatbox />
                <Footer />
            </AuthProvider>
        </div>
    );
};

export default App;
