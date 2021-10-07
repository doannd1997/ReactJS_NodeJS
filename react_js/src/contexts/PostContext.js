import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/PostReducer'
import axios from 'axios'
import {
	apiUrl,
	POSTS_LOADED_SUCCESS,
	POSTS_LOADED_FAIL,
	POSTS_ADD,
	POSTS_UPDATE,
	POSTS_DELETE,
	POSTS_FIND,
} from './Const'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	const [showAddPostModal, setShowAddPostModal] = useState(false)

	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

	const [showToast, setShowToast] = useState({
		show: true,
		message: '',
		type: null,
	})

	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		postLoading: true,
	})

	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({
					type: POSTS_LOADED_SUCCESS,
					payload: response.data.posts,
				})
			}
			return response.data
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL })
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	const addPost = async addedPost => {
		try {
			const response = await axios.post(`${apiUrl}/posts/create`, addedPost)
			if (response.data.success) {
				dispatch({ type: POSTS_ADD, payload: response.data.post })
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	const findPostWhenClick = postId => {
		const post = postState.posts.find(post => post._id === postId)
		dispatch({
			type: POSTS_FIND,
			payload: post,
		})
	}
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${updatedPost._id}`,
				updatedPost
			)
			if (response.data.success) {
				dispatch({
					type: POSTS_UPDATE,
					payload: response.data.post,
				})
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	const deletePost = async postId => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success) {
				dispatch({ type: POSTS_DELETE, payload: postId })
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server Error' }
		}
	}

	const postContextData = {
		postState,
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
		addPost,
		showToast,
		setShowToast,
		updatePost,
		deletePost,
		findPostWhenClick,
		showUpdatePostModal,
		setShowUpdatePostModal,
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
