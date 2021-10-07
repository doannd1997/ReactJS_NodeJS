export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:3000/api'
		: 'some-domain/api'

export const localStorageAccessTokenName = 'MERN-TOKEN-NAME'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
export const POSTS_ADD = 'POSTS_ADD'
export const POSTS_DELETE = 'POSTS_DELETE'
export const POSTS_UPDATE = 'POSTS_UPDATE'
export const POSTS_FIND = 'POSTS_FIND'