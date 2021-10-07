import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { POSTS_DELETE } from '../../contexts/Const'
import { PostContext } from '../../contexts/PostContext'

const ActionButton = ({ url, id }) => {
	const {
		deletePost,
		setShowToast,
		findPostWhenClick,
		setShowUpdatePostModal,
		setShowAddPostModal,
	} = useContext(PostContext)
	const onDeletePost = async () => {
		const { success, message } = await deletePost(id)
		setShowToast({
			show: true,
			message: message,
			type: success ? 'success' : 'danger',
		})
	}
	const onChoosePost = async () => {
		findPostWhenClick(id)
		setShowUpdatePostModal(true)
	}
	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img src={playIcon} alt='play' width='32' height='32'></img>
			</Button>
			<Button className='post-button' target='_blank' onClick={onChoosePost}>
				<img src={editIcon} alt='edit' width='24' height='24'></img>
			</Button>
			<Button className='post-button' target='_blank' onClick={onChoosePost}>
				<img src={deleteIcon} alt='delete' width='24' height='24'></img>
			</Button>
		</>
	)
}

export default ActionButton
