// context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem("authToken");
        console.log("AuthProvider initial state, token:", token);
        return !!token;
    });

    const login = (token: string) => {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        console.log("Logged in, token set:", token);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        console.log("Logged out, token removed");
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
