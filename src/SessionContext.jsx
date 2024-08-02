// SessionContext.js
import React, { createContext, useContext, useState,  } from 'react';

// Create a context
const SessionContext = createContext();

// Custom hook to use the session context
export const useSession = () => useContext(SessionContext);

// Provider component to wrap your app
export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Load user from localStorage if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userId) => {
        const userData = { id: userId }; // Simplified user data structure
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user data from localStorage
    };

    const value = { user, login, logout, isAuthenticated: !!user };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};
