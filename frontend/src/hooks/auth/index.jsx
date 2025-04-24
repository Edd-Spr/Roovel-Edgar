import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Componente proveedor
export const AuthProvider = ({ children }) => {
	const [ user, setUser ] = useState(null);
	const [ usrToken, setUsrToken ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const navigate = useNavigate();

	// Simulamos un efecto de carga de sesión (puedes hacer fetch a tu backend aquí)
	useEffect(() => {
		try {
			const usrTokenStored = JSON.parse( sessionStorage.getItem('jwt') );
			if ( usrTokenStored ) {
				setUser( usrTokenStored );
			}
	
			setLoading(false);
		} catch (error) {
			console.error('Error loading session:', error);
			setLoading(false);
		}
	}, []);

	const login = async (credentials) => {
		try {
			sessionStorage.setItem('jwt', JSON.stringify( credentials.token ));
			setUsrToken( credentials.token );
			navigate('/')
		} catch (error) {
			console.error('Error during login:', error);
			setLoading(false);
		}
	};

	const logout = () => {
		try {
			sessionStorage.removeItem('jwt');
			setUser(null);
			navigate('/auth'); // o donde quieras redirigir
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	const value = {
		user,
		usrToken,
		loading,
		login,
		logout,
		isAuthenticated: !!user
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
