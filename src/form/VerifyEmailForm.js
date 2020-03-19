import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../helpers/Spinner';
import { ErrorMessage } from '../helpers/setErrorMessage';

export default function VerifyEmailForm() {
	const { sendEmailVerification, errors } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFormSubmitted, setisFormSubmitted] = useState(false);
	const handleSubmit = e => {
		e.preventDefault();
		setIsSubmitting(true);
		sendEmailVerification();
		setTimeout(() => {
			setIsSubmitting(false);
			setisFormSubmitted(true);
		}, 1000);
	};

	const handleRedirect = e => {
		e.preventDefault();
		window.location = '/';
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit}>
				<legend>Verify your email</legend>
				<p>We've sent a verification email over to your email address.</p>
				<p>Don't see it?</p>
				<ErrorMessage message={errors && errors.error} />
				{isSubmitting && <Spinner />}
				<button type='submit' disabled={isFormSubmitted}>
					{isFormSubmitted ? 'Email sent' : 'Send email again'}
				</button>
				<button type='submit' onClick={handleRedirect}>
					I'm verified, let me in!
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
		cursor: pointer;
		background-color: steelblue;

		transition: 0.2s ease-out;
		&:hover {
			background-color: lightsteelblue;
		}

		&:last-of-type {
			background-color: lightsteelblue;
			margin-top: 1rem;

			transition: 0.2s ease-out;
			&:hover {
				background-color: steelblue;
			}
		}
	}

	p {
		text-align: center;
		margin-bottom: 2rem;
		&:last-of-type {
			font-weight: 600;
		}
	}
`;
