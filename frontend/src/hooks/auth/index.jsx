import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ userIsHost, setUserIsHost ] = useState(false);
    const [ usrToken, setUsrToken ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    function decodeToken() {
        /** 
         * userId
         * typeuser: 0 = user, 1 = host
        */
        try {
            const decoded = jwtDecode( usrToken );
            if ( !decoded ) {
                throw new Error('Token no válido o expirado');
            }
            return decoded;
        } catch (err) {
            console.error('Error al decodificar el token:', err);
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Necesitas iniciar sesión para acceder a esta página.',
                icon: 'info',
                confirmButtonText: 'OK'
            })
            navigate('/auth');
            return null;
        }
    }

    function redirectBasedOnRole( path = '/', condition, actions = (() => {}), onElseActions = (() => {}) ) {
        const decoded = decodeToken();
        if ( !decoded ) {
            console.error('No se pudo decodificar el token. Redirigiendo a /auth...');
            return;
        }

        if ( condition( decoded ) ) {
            console.log( 'Condition met, executing actions...' );
            actions();
            navigate( path );
        } else {
            console.log( 'Condition not met, executing else actions...' );
            onElseActions();
        }
    }


    // Cargar el token desde sessionStorage o cookies al cargar la aplicación
    useEffect(() => {
        console.log( 'Loading auth context...' );
        try {
            const storedToken = sessionStorage.getItem('jwt'); // O usa cookies si es necesario
            if (storedToken) {
                setUsrToken(storedToken);
                const decodedUser = jwtDecode( storedToken );
                setUser(decodedUser);
            } else {
                const currentPath = window.location.pathname;
                if ( currentPath !== '/' && currentPath !== '/auth' ) {
                    Swal.fire({
                        title: 'Acceso denegado',
                        text: 'No tienes permiso para acceder a esta página.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    navigate('/auth');
                }
                console.log('No se encontró un token en sessionStorage.');
                setLoading(false);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar el token:', error);
            setLoading(false);
        }
    }, []);

    const login = (data) => {
        const token = data.token || data; // Extrae el token si viene como un objeto
        if (!token) {
            console.error('No se proporcionó un token válido.');
            return;
        }

        sessionStorage.setItem('jwt', token); // Guarda el token en sessionStorage
        setUsrToken(token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setUserIsHost( Boolean( decodedUser.typeuser ) );
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
        isAuthenticated: !!usrToken,
        login,
        logout,
        redirectBasedOnRole
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
