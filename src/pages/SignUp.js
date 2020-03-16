import React from 'react';
import SignUpForm from '../form/SignUpForm';
import styled from 'styled-components';

export default function SignUp() {
	return (
		<Container>
			<SignUpForm />
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
