import React, { useState } from 'react'
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap'
import { useContext } from 'react'
import PostContextProvider, { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
	const { addPost, showAddPostModal, setShowAddPostModal, setShowToast } =
		useContext(PostContext)

	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN',
	})

	const closeDialog = () => {
		setShowAddPostModal(false)
		setNewPost({
			title: '',
			description: '',
			url: '',
			status: 'TO LEARN',
		})
	}

	const { title, description, url, status } = newPost

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPost(newPost)
		setShowToast({
			show: true,
			message: message,
			type: success ? 'success' : 'danger',
		})
		closeDialog()
	}

	return (
		<Modal
			show={showAddPostModal}
			animation={process.env.NODE_ENV === 'production'}
			onHide={closeDialog}
		>
			<Modal.Header closeButton>
				<Modal.Title>What do you whan to learn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewPostForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Description'
							name='description'
							required
							aria-describedby='title-help'
							as='textarea'
							row={3}
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Tutorial Url'
							name='url'
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}
export default AddPostModal
