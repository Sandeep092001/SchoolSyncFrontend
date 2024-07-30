// src/app/contexts/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if token exists and is valid
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // Verify token validity (you can use a library like jwt-decode)
            const decodedToken = decodeToken(token);
            const currentTime = Date.now() / 1000; // in seconds
            if (decodedToken.exp > currentTime) {
                setIsLoggedIn(true);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function decodeToken(token) {
    // Example function to decode JWT token (you may need to adjust based on your JWT library)
    return JSON.parse(atob(token.split('.')[1]));
}
