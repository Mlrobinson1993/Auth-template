import React, { createContext, useState, useEffect } from 'react';
import { DBAuth, firebase } from '../DB/Database';
import { setErrorMessage } from '../helpers/setErrorMessage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({});
	const [activeUser, setActiveUser] = useState(null);
	const [errors, setErrors] = useState({});
	const [isReAuthFormOpen, setIsReAuthFormOpen] = useState(false);
	const [formToAuthenticate, setFormToAuthenticate] = useState(null);
	const [newCredential, setNewCredential] = useState(null);
	const [updateSuccessful, setUpdateSuccessful] = useState({
		name: false,
		email: false,
		password: false,
	});

	useEffect(() => {
		DBAuth.onAuthStateChanged(setActiveUser);
	}, []);

	const sendEmailVerification = () => {
		return DBAuth.currentUser.sendEmailVerification().catch(error => {
			setErrorMessage(error);
		});
	};

	const showReAuthForm = () => {
		setIsReAuthFormOpen(true);
		return true;
	};
	const hideReAuthForm = () => {
		setIsReAuthFormOpen(false);
		return false;
	};

	const reAuthenticateUser = password => {
		const user = DBAuth.currentUser;
		let isAuthenticated = false;

		const credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			password
		);

		user
			.reauthenticateWithCredential(credential)
			.then(() => {
				isAuthenticated = true;
				if (formToAuthenticate === 'password') {
					changePassword(isAuthenticated, newCredential);
				} else if (formToAuthenticate === 'email') {
					changeEmail(isAuthenticated, newCredential);
				}
			})
			.catch(function(error) {
				isAuthenticated = false;
				const errorMessage = setErrorMessage(error);
				setErrors({ error: errorMessage });
			});
		return isAuthenticated;
	};

	const changeEmail = (isAuthenticated, email) => {
		const user = DBAuth.currentUser;

		if (isAuthenticated) {
			user
				.updateEmail(email)
				.then(() => {
					sendEmailVerification();
					setUpdateSuccessful({ ...updateSuccessful, email: true });
					hideReAuthForm();
				})
				.catch(error => {});
		} else {
			setErrorMessage('error: unknown');
		}
	};
	const changePassword = (isAuthenticated, password) => {
		const user = DBAuth.currentUser;

		if (isAuthenticated) {
			user
				.updatePassword(password)
				.then(() => {
					setUpdateSuccessful({ ...updateSuccessful, password: true });
					hideReAuthForm();
				})
				.catch(function(error) {});
		} else {
			setErrorMessage('error: unknown');
		}
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
				isReAuthFormOpen,
				setIsReAuthFormOpen,
				showReAuthForm,
				hideReAuthForm,
				reAuthenticateUser,
				setFormToAuthenticate,
				setNewCredential,
				updateSuccessful,
				setUpdateSuccessful,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
