import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../helpers/Spinner';

export default function VerifyEmailForm() {
	const { sendEmailVerification } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFormSubmitted, setisFormSubmitted] = useState(false);
	const handleSubmit = e => {
		setIsSubmitting(true);
		sendEmailVerification();
		e.preventDefault();
		setTimeout(() => {
			setIsSubmitting(false);
			setisFormSubmitted(true);
		}, 1000);
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit}>
				<legend>Verify your email</legend>
				<p>We've sent a verification email over to your email address.</p>
				<p>Don't see it?</p>
				{isSubmitting && <Spinner />}
				<button type='submit' disabled={isFormSubmitted}>
					{isFormSubmitted ? 'Email sent' : 'Send email again'}
				</button>
			</Form>
		</FormContainer>
	);
}

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
	border-radius: 3px;
	padding: 3rem 5rem;

	min-width: 50vw;
	min-height: 70vh;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
	width: 100%;
	margin-bottom: 2rem;

	legend {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
		font-weight: 600;
	}

	button {
		padding: 0.5rem 1rem;
		color: white;
		border-radius: 5px;
		border: none;
		color: white;
		background-color: steelblue;
	}

	p {
		text-align: center;
		margin-bottom: 2rem;
		&:last-of-type {
			font-weight: 600;
		}
	}
`;
