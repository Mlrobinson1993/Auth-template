import React, { useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';
import { DBAuth } from '../DB/Database';
import PrivateNav from './PrivateNav';

export default function Layout({ children }) {
	const { user, activeUser } = useContext(AuthContext);

	const setNav = () => {
		let Nav;

		if (activeUser) {
			Nav = (
				<PrivateNav
					displayName={
						user.firstName || activeUser.displayName.split(' ')[0] || 'Account'
					}
				/>
			);
		} else if (!activeUser) {
			Nav = <NavBar />;
		}

		return Nav;
	};
	return (
		<>
			{setNav()}
			{children};
		</>
	);
}
