import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { DBAuth } from '../DB/Database';

export default function PrivateNav({ displayName }) {
	const handleSignOut = () => {
		DBAuth.signOut();
	};
	return (
		<Nav>
			<LogoContainer className='logo'>
				<Link exact to='/'>
					LOGO HERE
				</Link>
			</LogoContainer>
			<ListContainer>
				<Link activeClassName='active-navlink' exact to='/'>
					Home
				</Link>

				<Link activeClassName='active-navlink' exact to='/protectedpage'>
					Protected Page
				</Link>
				<Link activeClassName='active-navlink' exact to='/account'>
					{displayName}
				</Link>

				<NavBtn onClick={handleSignOut}>Sign Out</NavBtn>
			</ListContainer>
		</Nav>
	);
}

const Nav = styled.nav`
	width: 100vw;
	height: 10vh;
	position: fixed;
	background: rgba(10, 10, 10, 0.8);
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	padding: 0 5rem;
`;

const LogoContainer = styled.span`
	grid-column: 1;
	display: flex;
	align-items: center;
	color: white;
`;

const ListContainer = styled.span`
	display: flex;
	flex-direction: row;
	grid-column: 2;
	list-style: none;
	align-items: center;
	justify-content: space-around;
`;

const Link = styled(NavLink)`
	color: white;
	padding-bottom: 1px;
	text-decoration: none;
	transition: 0.2s ease-out;
	border-bottom: 3px solid transparent;
`;

const NavBtn = styled.button`
	color: white;
	padding-bottom: 1px;
	text-decoration: none;
	border: none;
	background: transparent;
	outline: none;
	border-bottom: 3px solid transparent;
	cursor: pointer;
`;
