import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../helpers/Spinner';
import { DBAuth } from '../DB/Database';
import { setErrorMessage, ErrorMessage } from '../helpers/setErrorMessage';
import { AuthContext } from '../context/AuthContext';

export default function VerifyEmailForm() {
	const initialValues = { email: '' };
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { errors, setErrors } = useContext(AuthContext);

	const sendPasswordResetEmail = email => {
		DBAuth.sendPasswordResetEmail(email)
			.then(setIsSubmitted(true))
			.catch(error => {
				console.log(error);
				const errorMessage = setErrorMessage(error);
				setErrors({ error: errorMessage });
			});
	};

	const forgottenFormSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email')
			.required('Email required'),
	});

	return (
		<FormContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={forgottenFormSchema}
				onSubmit={(values, actions) => {
					sendPasswordResetEmail(values.email);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit}>
						{props.isSubmitting && <Spinner />}
						<legend>Forgotten your password?</legend>
						<ErrorMessage message={errors && errors.error} />
						<InputContainer>
							<input
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.email}
								name='email'
								type='email'
								placeholder='Johnsmith@domain.com'
								autoComplete='off'
							/>
							<Error errors={props.errors.email && props.touched.email}>
								{props.errors.email}
							</Error>
						</InputContainer>
						<button type='submit' disabled={props.isSubmitting || isSubmitted}>
							{!errors && isSubmitted ? 'Email sent' : 'Recover'}
						</button>
					</Form>
				)}
			</Formik>
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

	small {
		color: red;
		font-size: 0.8rem;
		text-align: center;
		margin-bottom: 0.5rem;
		max-width: 400px;
	}
`;

const InputContainer = styled.div`
	margin-bottom: 2rem;
	width: 100%;

	input {
		padding: 0.5rem 1rem;
		border: none;
		border-bottom: 1px solid lightgray;
		width: 100%;
		transition: 0.2s ease-out;

		&:focus {
			outline: none;
			border-bottom: 1px solid slateblue;
		}
		&:invalid {
			border-bottom: 1px solid red;
		}
	}
`;

const Error = styled.div`
	color: red;
	position: absolute;
	font-size: 12px;
	transition: 0.2s ease-out;
	padding-left: 1rem;
	opacity: ${props => (props.errors ? 1 : 0)};
	transform: ${props =>
		props.errors ? 'translateY(5px)' : 'translateY(-20px)'};
`;
