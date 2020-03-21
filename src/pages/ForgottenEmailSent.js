import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default function ForgottenEmailSent() {
	return (
		<Container>
			<FormContainer>
				<h1>Email Sent!</h1>
				<p>Can't see it? Check your junk folder.</p>
				<Link to='/signin'>Return to login</Link>
			</FormContainer>
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

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
	border-radius: 3px;
	padding: 3rem 5rem;

	min-width: 50vw;
	min-height: 40vh;

	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
		font-weight: 600;
	}
	p {
		margin-bottom: 2rem;
	}

	a {
		text-decoration: none;
		padding: 0.5rem 1rem;
		color: white;
		border-radius: 5px;
		border: none;
		color: white;
		cursor: pointer;
		background-color: steelblue;

		transition: 0.2s ease-out;
		&:hover {
			background-color: lightsteelblue;
		}
	}
`;
