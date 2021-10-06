import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'

const About = () => {
	return (
		<Row className='mt-5' style={{ marginLeft: 0, marginRight: 0 }}>
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
	)
}

export default About
