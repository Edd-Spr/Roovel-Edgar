import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [usrToken, setUsrToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Cargar el token desde sessionStorage o cookies al cargar la aplicación
    useEffect(() => {
        try {
            const storedToken = sessionStorage.getItem('jwt'); // O usa cookies si es necesario
            if (storedToken) {
                setUsrToken(storedToken);
                const decodedUser = jwtDecode(storedToken);
                setUser(decodedUser);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar el token:', error);
            setLoading(false);
        }
    }, []);

    const login = (token) => {
        sessionStorage.setItem('jwt', token); // Guarda el token en sessionStorage
        setUsrToken(token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        navigate('/');
    };

    const logout = () => {
        sessionStorage.removeItem('jwt'); // Elimina el token de sessionStorage
        setUsrToken(null);
        setUser(null);
        navigate('/auth');
    };

    const value = {
        user,
        usrToken,
        loading,
        login,
        logout,
        isAuthenticated: !!usrToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
