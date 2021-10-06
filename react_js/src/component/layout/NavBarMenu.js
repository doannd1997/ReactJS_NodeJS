import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import logo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { AuthContext } from '../../contexts/AuthContext'

const NavBarMenu = () => {
	const {
		authState: {
			user: { username },
		},
		logoutUser,
	} = useContext(AuthContext)

	const logout = () => {}

	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img src={logo} alt='Logo' width='32' hwight='32' className='mr-2' />
				MERN
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/about'
						as={Link}
					>
						About
					</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link className='font-weight-bolder text-white mr-2' disable>
						Welcome {username}
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logoutUser}
					>
						<img
							src={logoutIcon}
							alt='Log out'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavBarMenu
