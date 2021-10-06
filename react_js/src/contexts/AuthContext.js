import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

import { authReducer } from '../reducers/AuthReducer'
import { apiUrl, localStorageAccessTokenName } from './Const'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	})

	const loadUser = async () => {
		if (localStorage[localStorageAccessTokenName]) {
			setAuthToken(localStorage[localStorageAccessTokenName])
		} else {
		}
		try {
			const response = await axios.get(`${apiUrl}/auth`)
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					},
				})
			}
		} catch (error) {
			localStorage.removeItem(localStorageAccessTokenName)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: {
					isAuthenticated: false,
					user: null,
				},
			})
		}
	}

	useEffect(loadUser, [])

	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (response.data.success)
				localStorage.setItem(
					localStorageAccessTokenName,
					response.data.accessToken
				)

			await loadUser()
			return response.data
		} catch (error) {
			return {
				success: false,
				message: error.response.data.message,
			}
		}
	}

	const registerUser = async userForm => {
		function sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms))
		}
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
			if (response.data.success)
				localStorage.setItem(
					localStorageAccessTokenName,
					response.data.accessToken
				)

			// await sleep(20000)
			await loadUser()
			return response.data
		} catch (error) {
			return {
				success: false,
				message: error.response.data.message,
			}
		}
	}

	const logoutUser = () => {
		localStorage.removeItem(localStorageAccessTokenName)
		dispatch({
			type: 'SET_AUTH',
			payload: {
				isAuthenticated: false,
				user: null,
			},
		})
	}

	const authContextData = { loginUser, registerUser, logoutUser, authState }

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
