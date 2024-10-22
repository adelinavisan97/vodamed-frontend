// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("AuthProvider useEffect, token:", token); // Log token value
    if (token) {
      setIsAuthenticated(true);
      console.log("AuthProvider useEffect, isAuthenticated set to true");
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    console.log("Logged in, token set:", token);
    navigate("/"); // Redirect to home page after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    console.log("Logged out, token removed");
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
