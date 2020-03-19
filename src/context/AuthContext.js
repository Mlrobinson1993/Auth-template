import React, { createContext, useState, useEffect } from 'react';
import { DBAuth } from '../DB/Database';
import { setErrorMessage } from '../helpers/setErrorMessage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({});
	const [activeUser, setActiveUser] = useState(null);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		DBAuth.onAuthStateChanged(setActiveUser);
	}, []);

	const sendEmailVerification = () => {
		return DBAuth.currentUser.sendEmailVerification().catch(error => {
			setErrorMessage(error);
		});
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
				errors,
				setErrors,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
