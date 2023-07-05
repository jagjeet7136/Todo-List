import React, { createContext, useState, useEffect } from 'react';
import { DeleteTask } from '../components/task/DeleteTask';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    // Check if token exists in localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setLoggedIn(true);
        }
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        setLoggedIn(true);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken('');
        setLoggedIn(false);
        // Remove token from localStorage
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ loggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };