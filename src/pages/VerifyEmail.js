import React from 'react';
import styled from 'styled-components';
import VerifyEmailForm from '../form/VerifyEmailForm';
export default function VerifyEmail() {
	return (
		<Container>
			<VerifyEmailForm />
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
