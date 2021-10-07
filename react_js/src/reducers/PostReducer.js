import {
	POSTS_LOADED_SUCCESS,
	POSTS_LOADED_FAIL,
	POSTS_ADD,
	POSTS_UPDATE,
	POSTS_DELETE,
	POSTS_FIND,
} from '../contexts/Const'
export const postReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case POSTS_LOADED_SUCCESS:
			return { ...state, postLoading: false, posts: payload }
		case POSTS_LOADED_FAIL:
			return { ...state, postLoading: false, posts: [] }
		case POSTS_ADD:
			return {
				...state,
				posts: [...state.posts, payload],
			}
		case POSTS_DELETE:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload),
			}
		case POSTS_UPDATE:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id == payload._id ? payload : post
				),
			}
		case POSTS_FIND:
			return {
				...state,
				post: payload,
			}
		default:
			return state
	}
}
