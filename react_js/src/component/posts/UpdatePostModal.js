import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap'
import { useContext } from 'react'
import PostContextProvider, { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	const {
		postState: { post },
		showUpdatePostModal,
		setShowUpdatePostModal,
		setShowToast,
		updatePost,
	} = useContext(PostContext)

	const [updatedPost, setUpdatedPost] = useState(post)

	useEffect(() => setUpdatedPost(post), [post])

	const { _id, title, description, url, status } = updatedPost

	const closeDialog = () => {
		setUpdatedPost(post)
		setShowUpdatePostModal(false)
	}

	const onChangeUpdatedPostForm = event =>
		setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePost(updatedPost)
		setShowToast({
			show: true,
			message: message,
			type: success ? 'success' : 'danger',
		})
		closeDialog()
	}
	return (
		<Modal
			show={showUpdatePostModal}
			animation={process.env.NODE_ENV === 'production'}
			onHide={closeDialog}
		>
			<Modal.Header closeButton>
				<Modal.Title>What do you whan to change?</Modal.Title>
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
							onChange={onChangeUpdatedPostForm}
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
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Tutorial Url'
							name='url'
							value={url}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							name='status'
							value={status}
							onChange={onChangeUpdatedPostForm}
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
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
export default UpdatePostModal
