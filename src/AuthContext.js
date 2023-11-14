import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        // Aquí iría la lógica para llamar a tu API de autenticación
        // Simulando una respuesta
        const response = { isAuthenticated: true, userRole: 'operario' }; // Cambiar según la respuesta real
        setUser(response);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
