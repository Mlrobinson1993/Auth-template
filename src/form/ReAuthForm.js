import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { setErrorMessage, ErrorMessage } from '../helpers/setErrorMessage';
import { DBAuth } from '../DB/Database';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../helpers/Spinner';

export default function ReAuthForm() {
	const { activeUser, updatePassword } = useContext(AuthContext);
	const initialValues = { email: activeUser.email, password: '' };

	const ReAuthSchema = Yup.object().shape({
		password: Yup.string().required('Password required'),
	});

	const reAuthenticateUser = password => {
		const user = DBAuth.currentUser;
		user
			.reauthenticateWithCredential(password)
			.then(() => {
				updatePassword(user);
			})
			.catch(function(error) {
				// An error happened.
			});
	};

	return (
		<Container>
			<Formik
				initialValues={initialValues}
				validationSchema={ReAuthSchema}
				onSubmit={(values, actions) => {
					reAuthenticateUser(values.password);
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
							Sign in
						</button>
					</Form>
				)}
			</Formik>

			<BottomContainer>
				<Link to='/forgottenpassword'>Forgot your password?</Link>
			</BottomContainer>
		</Container>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.8);
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
		text-align: center;

		&:hover {
			border-bottom: 2px solid steelblue;
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
