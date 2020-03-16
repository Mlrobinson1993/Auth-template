import React from 'react';
import styled from 'styled-components';
import SignInForm from '../form/SignInForm';
export default function SignIn() {
	return (
		<Container>
			<SignInForm />
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;
