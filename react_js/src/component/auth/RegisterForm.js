import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/Alert'

const Register = () => {
	const { registerUser } = useContext(AuthContext)

	const [alert, setAlert] = useState(null)

	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})

	const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value,
		})

	const { username, password, confirmPassword } = registerForm

	const register = async event => {
		event.preventDefault()
		if (registerForm.password !== registerForm.confirmPassword) {
			setAlert({
				type: 'danger',
				message: 'Password confirm mismatched!',
			})
			return setTimeout(() => {
				setAlert(null)
			}, 2000)
		}
		try {
			const resigterData = await registerUser(registerForm)
			if (resigterData.success) {
				// history.push('/dashboard')
			} else {
				setAlert({ type: 'danger', message: resigterData.message })
				setTimeout(() => {
					setAlert(null)
				}, 2000)
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	return (
		<>
			<Form onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='username'
						name='username'
						required
						value={username}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='password'
						name='password'
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='confirm password'
						name='confirmPassword'
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Button variant='success' type='submit'>
						Register
					</Button>
				</Form.Group>
			</Form>
			<p>
				Already has account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}

export default Register
