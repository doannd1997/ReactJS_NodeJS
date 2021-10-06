export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:3000/api'
		: 'some-domain/api'

export const localStorageAccessTokenName = 'MERN-TOKEN-NAME'
