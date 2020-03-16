import React, { createContext, useState, useEffect } from 'react';
import { DBAuth } from '../DB/Database';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({});
	const [activeUser, setActiveUser] = useState(null);

	useEffect(() => {
		DBAuth.onAuthStateChanged(setActiveUser);
	}, []);

	const sendEmailVerification = () => {
		return DBAuth.currentUser.sendEmailVerification();
	};

	return (
		<AuthContext.Provider
			value={{
				sendEmailVerification,
				activeUser,
				setIsLoading,
				isLoading,
				setUser,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
