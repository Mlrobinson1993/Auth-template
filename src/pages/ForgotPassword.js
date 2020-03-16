import React from 'react';
import styled from 'styled-components';
import ForgottenPasswordForm from '../form/ForgottenPasswordForm';
export default function ForgotPassword() {
	return (
		<Container>
			<ForgottenPasswordForm />
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
