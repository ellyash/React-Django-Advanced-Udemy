import { useContext, createContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ user, children }) => {
	const [authData, setAuthData] = useState(user);

	const setAuth = (newUser) => {
		if (newUser) {
			localStorage.setItem(
				'user-token',
				JSON.stringify(newUser)
			);
		} else {
			localStorage.removeItem('user-token');
		}
		setAuthData(newUser);
	};

	return (
		<AuthContext.Provider value={{ authData, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
