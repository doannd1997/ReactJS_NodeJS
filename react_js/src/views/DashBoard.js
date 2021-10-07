import { useContext, useEffect } from 'react'
import {
	Button,
	Card,
	Spinner,
	Row,
	Col,
	OverlayTrigger,
	Tooltip,
	Toast,
} from 'react-bootstrap'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import SinglePost from '../component/posts/SinglePost'
import AddPostModal from '../component/posts/AddPostModal'
import UpdatePostModal from '../component/posts/UpdatePostModal'
import addItem from '../assets/plus-circle-fill.svg'

const DashBoard = () => {
	const {
		authState: {
			user: { username },
		},
	} = useContext(AuthContext)

	const {
		postState: { posts, postLoading, post },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast,
	} = useContext(PostContext)

	let body = null

	if (postLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' vatiant='info' />
			</div>
		)
	} else if (posts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi, {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welome To MEARN</Card.Title>
						<Card.Text>Click to add first skill</Card.Text>
						<Button variant='info'>MEARN</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>
				{/* <OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				> */}
				<Button
					className='btn-floating'
					onClick={() => {
						setShowAddPostModal(true)
					}}
				>
					<img src={addItem} alt='Add item' width='60' height='60' />
				</Button>
				{/* </OverlayTrigger> */}
			</>
		)
	}

	useEffect(getPosts, [])

	return (
		<>
			{body}
			<AddPostModal />
			{post && <UpdatePostModal />}
			<Toast
				show={show}
				style={{ position: 'fixed', bottom: '30px', left: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null,
				})}
				delay={3000}
				autohide
				animation={process.env.NODE_ENV === 'production'}
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default DashBoard
