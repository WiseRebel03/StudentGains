import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null = not logged in
    const [verification, setVerification] = useState({
        status: 'not_verified', // 'not_verified' | 'pending' | 'verified'
        method: null,           // 'college_email' | 'document'
        expiryDate: null,
    });

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setVerification({ status: 'not_verified', method: null, expiryDate: null });
    };

    const updateProfile = (profileData) => {
        setUser(prev => ({ ...prev, ...profileData }));
    };

    const updateVerification = (verData) => {
        setVerification(prev => ({ ...prev, ...verData }));
    };

    return (
        <AuthContext.Provider value={{ user, verification, login, logout, updateProfile, updateVerification }}>
            {children}
        </AuthContext.Provider>
    );
};
