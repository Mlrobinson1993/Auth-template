import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../helpers/setErrorMessage';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../helpers/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ReAuthForm() {
	const { activeUser, reAuthenticateUser, hideReAuthForm } = useContext(
		AuthContext
	);
	const initialValues = { email: activeUser.email, password: '' };
	const { errors, setErrors } = useContext(AuthContext);

	const ReAuthSchema = Yup.object().shape({
		password: Yup.string().required('Password required'),
	});

	return (
		<Container>
			<FormContainer>
				<CloseForm onClick={hideReAuthForm}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</CloseForm>
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
							<legend>Is that really you?</legend>
							<small>Reconfirm your password so we can be sure.</small>
							<ErrorMessage message={errors && errors.error} />
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
								Reauthenticate
							</button>
						</Form>
					)}
				</Formik>

				<BottomContainer>
					<Link to='/forgottenpassword'>Forgot your password?</Link>
				</BottomContainer>
			</FormContainer>
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
	border-radius: 3px;
	padding: 3rem 5rem;
	min-width: 40vw;
	max-width: 70vw;
	min-height: 40vh;
	max-height: 60vh;
	background: white;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
	width: 100%;
	margin: auto;

	legend {
		font-size: 2rem;
		margin-bottom: 2rem;
		font-weight: 600;
		text-align: center;
	}
	small {
		margin-bottom: 1rem;
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
		margin-top: 2rem;
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

const CloseForm = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	position: relative;
	justify-self: flex-start;
	align-self: flex-start;
	transform: translate(-50px, -25px);
`;
