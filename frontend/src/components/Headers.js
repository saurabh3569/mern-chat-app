import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectUser, setUser } from '../features/userSlice'

const Headers = () => {

    const user = useSelector(selectUser)

    const dispatch = useDispatch(selectUser)

    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(setUser(null))
        navigate('/login')
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link className='navbar-brand' to='/chat'>Chat App</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && <Link to='/login' className='nav-link'>Login</Link>}
                        {!user && <Link to='/signup' className='nav-link'>Signup</Link>}
                        {user && <NavDropdown title={user.name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Headers
