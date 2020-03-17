const setErrorMessage = error => {
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
			errorMsg = 'Unknown error occured, please try again';
			break;
	}

	return errorMsg;
};

export default setErrorMessage;
