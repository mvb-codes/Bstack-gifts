import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user exists
        const existingUser = users.find(u => u.username === username && u.password === password);

        if (existingUser) {
            const userData = { username: existingUser.username };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setUser(userData);
            return true;
        } else {
            // Create new user if doesn't exist
            const newUser = { username, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            const userData = { username };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setUser(userData);
            return true;
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
