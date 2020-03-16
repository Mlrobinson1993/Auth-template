import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../helpers/Spinner';
import { Redirect } from 'react-router-dom';

export default function Home() {
	const { activeUser } = useContext(AuthContext);
	return activeUser.emailVerified ? (
		<Container>
			{activeUser ? (
				<h1 style={{ margin: 'auto 0' }}>
					{' '}
					{activeUser.displayName}'s Home Page
				</h1>
			) : (
				<Spinner />
			)}
		</Container>
	) : (
		<Redirect to='/verifyemail' />
	);
}

const Container = styled.div`
	min-height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
`;
