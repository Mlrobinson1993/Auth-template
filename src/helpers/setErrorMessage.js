import React from 'react';
import styled from 'styled-components';

const ErrorMsg = styled.small`
	color: red;
	font-size: 0.8rem;
	text-align: center;
	margin-bottom: 0.5rem;
`;

export default function ErrorMessage({ message }) {
	return <ErrorMsg>{message}</ErrorMsg>;
}

const setErrorMessage = error => {
	console.log(error);
	let errorMsg = '';

	switch (error.code) {
		case 'auth/user-not-found':
			errorMsg = 'No user found, please check the email address and try again';
			break;
		case 'auth/network-request-failed':
			errorMsg = 'Network error, please try again later';
			break;
		case 'auth/account-exists-with-different-credential':
			errorMsg =
				'Whoops! Looks like you used Google to sign up, try signing in with Google instead.';
			break;
		case 'auth/email-already-in-use':
			errorMsg = 'Whoops! like an account with that email already exists!';
			break;
		case 'auth/wrong-password':
			errorMsg = 'Invalid username or password';
			break;
		default:
			errorMsg = 'Unknown error occurred, please try again';
			break;
	}

	return errorMsg;
};

export { setErrorMessage, ErrorMessage };
