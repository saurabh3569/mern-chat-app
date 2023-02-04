import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './style.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/user/login',
                { email, password })
            dispatch(setUser(data))
            if (data) { toast.success('successfully login') }
            if (data) { navigate('/chat') }
        } catch (error) {
            toast.error(error.response.data);
        }
    }


    return (
        <Container className='w-50 itemlogin'>
            <Form onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button className='w-100' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <div className='text-center mt-2'>
                <h6>Don't Have an account ?<Link to='/signup' className='text-decoration-none'> Register</Link></h6>
            </div>
        </Container>

    )
}

export default Login
