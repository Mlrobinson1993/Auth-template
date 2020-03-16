import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { DBAuth } from '../DB/Database';

import Spinner from '../helpers/Spinner';

export default function AccountPageForm() {
	const { activeUser, sendEmailVerification } = useContext(AuthContext);
	const initialValues = { name: '', email: '', password: '' };
	const [updateSuccessful, setUpdateSuccessful] = useState(false);

	const AccountSchema = Yup.object().shape({
		name: Yup.string()
			.min('2', 'Name must be a minimum of 2 characters')
			.max('100', 'Name can only be a maximum of 100 characters'),
		email: Yup.string().email('Invalid email'),
		password: Yup.string().min(8, 'Password must be a minimum of 8 characters'),
	});

	const showSuccessMessage = () => {
		setUpdateSuccessful(true);

		setTimeout(() => {
			setUpdateSuccessful(false);
		}, 1000);
	};

	const handleDetailChange = formValues => {
		const user = DBAuth.currentUser;
		formValues.name !== '' && handleNameChange(formValues.name, user);
		formValues.email !== '' && handleEmailChange(formValues.email, user);
		formValues.password !== '' &&
			handlePasswordChange(formValues.password, user);
	};

	const handleNameChange = (name, user) => {
		user
			.updateProfile({
				displayName: name,
			})
			.then(() => showSuccessMessage())
			.catch(error => {
				console.log(error.code + ':' + error.message);
			});
	};
	const handleEmailChange = (email, user) => {
		user
			.updateEmail(email)
			.then(() => {
				showSuccessMessage();
				sendEmailVerification();
			})
			.catch(error => {
				console.log(error.code + ':' + error.message);
			});
	};

	const handlePasswordChange = (password, user) => {
		user
			.updatePassword(password)
			.then(function() {
				showSuccessMessage();
			})
			.catch(function(error) {
				// An error happened.
			});
	};

	const handleDelete = () => {
		const user = DBAuth.currentUser;

		user
			.delete()
			.then((window.location = '/signin'))
			.catch(error => {
				console.log(error.code + ': ' + error.message);
			});
	};

	return (
		<FormContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={AccountSchema}
				onSubmit={(values, actions) => {
					handleDetailChange(values);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit} disabled={props.isSubmitting}>
						{props.isSubmitting && <Spinner />}
						<legend>Change your details</legend>
						<InputContainer>
							<Field
								name='name'
								type='text'
								placeholder={activeUser.displayName}
								autoComplete='off'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.name}
							/>
							<Error errors={props.errors.name && props.touched.name}>
								{props.errors.name}
							</Error>
						</InputContainer>
						<InputContainer>
							<Field
								name='email'
								type='email'
								placeholder={activeUser.email}
								autoComplete='off'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.email}
							/>
							<Error errors={props.errors.email && props.touched.email}>
								{props.errors.email}
							</Error>
						</InputContainer>
						<InputContainer>
							<Field
								name='password'
								type='password'
								placeholder='New password'
								autoComplete='off'
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.password}
							/>
							<Error errors={props.errors.password && props.touched.password}>
								{props.errors.password}
							</Error>
						</InputContainer>
						<button
							type='submit'
							disabled={props.errors.password && props.touched.password}
						>
							{updateSuccessful ? 'Changes Submitted' : 'Submit Changes'}
						</button>
					</Form>
				)}
			</Formik>

			<BottomContainer>
				<button onClick={handleDelete}>Delete account</button>
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
	margin-bottom: 1rem;

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
		align-self: center;
		border: none;
		color: white;
		min-width: 150px;
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

	button {
		padding: 0.5rem 1rem;
		color: white;
		border-radius: 5px;
		border: none;
		color: white;
		align-self: center;
		min-width: 150px;
		background-color: red;
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
