import React, { useContext } from 'react';
import styled from 'styled-components';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../helpers/Spinner';
import { DBAuth } from '../DB/Database';
import { AuthContext } from '../context/AuthContext';

export default function SignUpForm() {
	const { sendEmailVerification, setUser } = useContext(AuthContext);

	const initialValues = {
		name: '',
		email: '',
		password: '',
	};

	const signUpSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'A little longer!')
			.max(50, 'A little shorter!')
			.required('Name required'),
		email: Yup.string()
			.email('Invalid email')
			.required('Email required'),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.max(8, 'Password must be less than 24 characters')
			.required('Password required'),
	});

	const signUpUser = (email, password, name) => {
		DBAuth.createUserWithEmailAndPassword(email, password)
			.then(res => {
				res.user.updateProfile({
					displayName: name,
				});
				sendEmailVerification();
				setUser({
					firstName: name.split(' ')[0],
					lastName: name.split(' ')[name.split(' ').length - 1],
					email: email,
				});
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
				validationSchema={signUpSchema}
				onSubmit={(values, actions) => {
					signUpUser(values.email, values.password, values.name);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit}>
						{props.isSubmitting && <Spinner />}
						<legend>Create an account</legend>
						<InputContainer>
							<Field
								name='name'
								type='text'
								placeholder='John Smith'
								autoComplete='off'
								onChange={props.handleChange}
							/>
							<Error errors={props.errors.name && props.touched.name}>
								{props.errors.name}
							</Error>
						</InputContainer>
						<InputContainer>
							<Field
								name='email'
								type='email'
								placeholder='Johnsmith@gmail.com'
								autoComplete='off'
								onChange={props.handleChange}
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
				<span>Or sign up with Google</span>
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
