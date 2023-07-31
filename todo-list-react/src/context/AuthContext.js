import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //This is because any state variable do not reset when route is used
    const storedToken = localStorage.getItem('token');
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedUsername = localStorage.getItem("username");
    // const storedUser = localStorage.getItem("user");
    const [loggedIn, setLoggedIn] = useState(storedLoggedIn);
    const [token, setToken] = useState(storedToken);
    const [username, setUsername] = useState(storedUsername);
    const [user, setUser] = useState(null);

    //This is because so that if any state variable change should change localStorage values to keep former comment valid
    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('loggedIn', loggedIn.toString());
        localStorage.setItem("username", username.toString());
    }, [token, loggedIn, username]);

    const login = (newToken, newUsername) => {
        setToken(newToken);
        setLoggedIn(true);
        setUsername(newUsername);
    };

    const setUserFunction = (newUser) => {
        setUser(newUser);
    }

    const logout = () => {
        setToken('');
        setLoggedIn(false);
        setUsername("");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ loggedIn, token, login, logout, username, user, setUserFunction }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };