// context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";



interface AuthContextProps {
    isAuthenticated: boolean;
    isDoctor: boolean;  
    login: (token: string, isDoctor: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem("authToken");
        return !!token;
    });
    
    // Add isDoctor state
    const [isDoctor, setIsDoctor] = useState<boolean>(() => {
        return localStorage.getItem("isDoctor") === "true";
    });

    // Update login to handle isDoctor
    const login = (token: string, isDoctor: boolean) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("isDoctor", String(isDoctor));
        setIsAuthenticated(true);
        setIsDoctor(isDoctor);
        console.log("Logged in, token set:", token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isDoctor");
        setIsAuthenticated(false);
        setIsDoctor(false);
        console.log("Logged out, token removed");
        navigate("/signin");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isDoctor, login, logout }}>
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
