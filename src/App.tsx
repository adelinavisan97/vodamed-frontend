// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Menu from "./components/Menu";
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard";
import SignInComponent from "./components/authentication/SIgnInComponent";
import Contact from './pages/Contact';
import Medications from './pages/Medications';
import { AuthProvider } from "./components/authentication/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/medications" element={<Medications />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;