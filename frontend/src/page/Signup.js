import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './style.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../features/userSlice'
import { toast } from 'react-toastify'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/user/register',
                { name, email, password })

            dispatch(setUser(data))
            if (data) toast.success('Account created successfully')
            if (data) navigate('/login')
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    return (
        <Container className='w-50 itemlogin'>
            <Form onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button className='w-100' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <div className='text-center mt-2'>
                <h6>Already Have an account ?<Link to='/login' className='text-decoration-none'> Login</Link></h6>
            </div>
        </Container>
    )
}

export default Signup
