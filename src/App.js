import React, { useContext, useEffect } from 'react';
import './style.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import Spinner from './helpers/Spinner';

import { AuthContext } from './context/AuthContext';

function App() {
	const { activeUser, isLoading, setIsLoading } = useContext(AuthContext);
	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);
	let routes;
	if (activeUser) {
		console.log(activeUser.uid);
	}

	//if is logged in and email is NOT verified
	if (activeUser && activeUser.emailVerified === false) {
		routes = (
			<Switch>
				<Route Route exact path='/account' component={Account} />
				<Route exact path='/forgottenpassword' component={ForgotPassword} />
				<Route Route exact path='/verifyemail' component={VerifyEmail} />
				<Redirect to='/verifyemail' />
			</Switch>
		);
	}
	//if user is logged in and email is verified
	else if (activeUser) {
		routes = (
			<Switch>
				<Route Route exact path='/' component={Home} />
				<Route Route exact path='/account' component={Account} />
				<Redirect to='/' />
			</Switch>
		);
		//if user is logged out
	} else if (!activeUser) {
		routes = (
			<Switch>
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
				<Route exact path='/forgottenpassword' component={ForgotPassword} />
				<Redirect to='/signin' />
			</Switch>
		);
	}

	return isLoading ? (
		<Spinner />
	) : (
		<Layout>
			<div className='App'>{routes}</div>
		</Layout>
	);
}

export default App;
