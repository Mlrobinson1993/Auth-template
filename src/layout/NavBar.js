import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
	return (
		<Nav>
			<LogoContainer className='logo'>
				<Link to='/'>LOGO HERE</Link>
			</LogoContainer>
			<ListContainer>
				<Link activeClassName='active-navlink' exact to='/'>
					Home
				</Link>

				<Link activeClassName='active-navlink' exact to='/signin'>
					Sign In
				</Link>

				<Link activeClassName='active-navlink' exact to='/signup'>
					Sign Up
				</Link>
			</ListContainer>
		</Nav>
	);
}

const Nav = styled.nav`
	position: fixed;
	width: 100vw;
	height: 10vh;
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
	border-bottom: 3px solid transparent;
	transition: 0.2s ease-out;
`;
