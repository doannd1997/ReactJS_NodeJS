import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/Alert'

const Login = () => {
	const { loginUser } = useContext(AuthContext)

	// const history = useHistory()

	const [alert, setAlert] = useState(null)

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})

	const onChangeLoginForm = event =>
		setLoginForm({
			...loginForm,
			[event.target.name]: event.target.value,
		})

	const { username, password } = loginForm

	const login = async event => {
		event.preventDefault()
		try {
			const loginData = await loginUser(loginForm)
			if (loginData.success) {
				// history.push('/dashboard')
			} else {
				setAlert({ type: 'danger', message: loginData.message })
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
			<Form className='my-4' onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Button variant='success' type='submit'>
						Log In
					</Button>
				</Form.Group>
			</Form>
			<p>
				Don't have Account?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default Login
