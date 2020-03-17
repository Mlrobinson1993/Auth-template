import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedPage() {
	const { activeUser, user } = useContext(AuthContext);

	return (
		<Container>
			<h1>{activeUser.displayName || user.displayName}'s Protected Page</h1>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
`;
