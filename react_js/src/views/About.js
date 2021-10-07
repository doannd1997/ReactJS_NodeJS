import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'

const About = () => {
	return (
		<>
			<Row className='mt-2' style={{ marginLeft: 0, marginRight: 0 }}>
				<Col className='text-center'>
					<Button
						variant='primary'
						href='https://www.facebook.com/doannd1997'
						size='lg'
						target='_blank'
					>
						Visit My Facebook Home Page!
					</Button>
				</Col>
			</Row>
			<Row className='mt-4' style={{ marginLeft: 0, marginRight: 0 }}>
				<Col className='text-center font-weight-bolder'>
					This Website was built based on Youtube Tutorial, Thank To Henry Web
					Dev!
				</Col>
			</Row>
			<Row className='mt-2' style={{ marginLeft: 0, marginRight: 0 }}>
				<Col className='text-center'>
					<div className='video-responsive'>
						<iframe
							width='853'
							height='480'
							src={`https://www.youtube.com/embed/rgFd17fyM4A`}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							title='Embedded youtube'
						/>
					</div>
				</Col>
			</Row>
		</>
	)
}

export default About
