import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const [loggedIn, setLoggedIn] = useState(storedLoggedIn);
    const [token, setToken] = useState(storedToken);

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('loggedIn', loggedIn.toString());
    }, [token, loggedIn]);

    const login = (newToken) => {
        setToken(newToken);
        setLoggedIn(true);
    };

    const logout = () => {
        setToken('');
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
    };

    return (
        <AuthContext.Provider value={{ loggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };