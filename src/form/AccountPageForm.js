import React, { useContext } from 'react';
import styled from 'styled-components';

import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { DBAuth } from '../DB/Database';

export default function AccountPageForm() {
	const {
		activeUser,
		setUser,
		showReAuthForm,
		setFormToAuthenticate,
		setNewCredential,
		updateSuccessful,
		setUpdateSuccessful,
	} = useContext(AuthContext);
	const initialValues = { name: '', email: '', password: '' };

	const nameSchema = Yup.object().shape({
		name: Yup.string()
			.min('2', 'Name must be a minimum of 2 characters')
			.max('100', 'Name can only be a maximum of 100 characters'),
	});
	const emailSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email'),
	});
	const passwordSchema = Yup.object().shape({
		password: Yup.string()
			.min(8, 'Password must be a minimum of 8 characters')
			.required('Password required'),
	});

	const handleNameChange = name => {
		const user = DBAuth.currentUser;
		setUser({
			...user,
			firstName: name.split(' ')[0],
			lastName: name.split(' ')[name.split(' ').length - 1],
		});

		user
			.updateProfile({
				displayName: name,
			})
			.catch(error => {
				console.log(error.code + ':' + error.message);
			});

		setUpdateSuccessful({ ...updateSuccessful, name: true });
	};

	const handleEmailChange = email => {
		showReAuthForm();
		setNewCredential(email);
		setFormToAuthenticate('email');
	};

	const handlePasswordChange = password => {
		showReAuthForm();
		setNewCredential(password);
		setFormToAuthenticate('password');
	};

	const handleDeleteAccount = e => {
		e.preventDefault();
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
			<h1>Change your details</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={nameSchema}
				onSubmit={(values, actions) => {
					handleNameChange(values.name);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit}>
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
							<button
								type='submit'
								disabled={props.errors.name && props.touched.name}
							>
								{updateSuccessful.name ? 'Updated' : 'Update'}
							</button>

							<Error errors={props.errors.name && props.touched.name}>
								{props.errors.name}
							</Error>
						</InputContainer>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues}
				validationSchema={emailSchema}
				onSubmit={(values, actions) => {
					handleEmailChange(values.email);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit}>
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
							<button
								type='submit'
								disabled={props.errors.email && props.touched.email}
							>
								{updateSuccessful.email ? 'Updated' : 'Update'}
							</button>
							<Error errors={props.errors.email && props.touched.email}>
								{props.errors.email}
							</Error>
						</InputContainer>
					</Form>
				)}
			</Formik>

			<Formik
				initialValues={initialValues}
				validationSchema={passwordSchema}
				onSubmit={(values, actions) => {
					handlePasswordChange(values.password);
					setTimeout(() => {
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{props => (
					<Form onSubmit={props.handleSubmit}>
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
							<button
								type='submit'
								disabled={props.errors.password && props.touched.password}
							>
								{updateSuccessful.password ? 'Updated' : 'Update'}
							</button>
							<Error errors={props.errors.password && props.touched.password}>
								{props.errors.password}
							</Error>
						</InputContainer>
					</Form>
				)}
			</Formik>

			<BottomContainer>
				<form onSubmit={handleDeleteAccount}>
					<button type='submit'>Delete account</button>
				</form>
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

	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		font-weight: 600;
		text-align: center;
	}
`;

const Form = styled.form`
	width: 100%;
	margin-bottom: 1rem;

	button {
		padding: 0.5rem 1rem;
		color: white;
		border-radius: 5px;
		align-self: center;
		border: none;
		color: white;
		margin-left: 1rem;
		background-color: steelblue;
	}
`;

const InputContainer = styled.div`
	margin-bottom: 2rem;
	width: 100%;
	display: flex;
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
		props.errors ? 'translateY(45px)' : 'translateY(10px)'};
`;
