import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { DBAuth } from '../DB/Database';

import Spinner from '../helpers/Spinner';

export default function SignInForm() {
	const initialValues = { email: '', password: '' };

	const signInSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email')
			.required('Email required'),
		password: Yup.string().required('Password required'),
	});

	const signInUser = (email, password) => {
		DBAuth.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('success');
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(`${errorCode}: ${errorMessage}`);
			});
	};

	return (
		<FormContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={signInSchema}
				onSubmit={(values, actions) => {
					signInUser(values.email, values.password);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
						{props.isSubmitting && <Spinner />}
						<legend>Sign In</legend>
						<InputContainer>
							<Field
								name='email'
								type='email'
								placeholder='Johnsmith@domain.com'
								autoComplete='off'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.name}
							/>
							<Error errors={props.errors.email && props.touched.email}>
								{props.errors.email}
							</Error>
						</InputContainer>
						<InputContainer>
							<Field
								name='password'
								type='password'
								placeholder='Password'
								autoComplete='off'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.name}
							/>
							<Error errors={props.errors.password && props.touched.password}>
								{props.errors.password}
							</Error>
						</InputContainer>
						<button
							type='submit'
							disabled={props.errors.password && props.touched.password}
						>
							Submit
						</button>
					</Form>
				)}
			</Formik>

			<BottomContainer>
				<Link to='/forgottenpassword'>Forgot your password?</Link>
				<span>Or sign in with Google</span>
				<button>Google button</button>
			</BottomContainer>
		</FormContainer>
	);
}

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
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
		font-weight: 600;
		text-align: center;
	}

	button {
		padding: 0.5rem 1rem;
		color: white;
		border-radius: 5px;
		border: none;
		color: white;
		background-color: steelblue;
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

const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 40%;

	a {
		color: steelblue;
		text-decoration: none;
		margin-bottom: 2rem;
		border-bottom: 2px solid transparent;
		transition: 0.2s ease-out;

		&:hover {
			border-bottom: 2px solid steelblue;
		}
	}

	span {
		margin-bottom: 1rem;
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
