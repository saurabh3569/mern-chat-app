import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectSelectChat, selectUser } from '../features/userSlice'
import './style.css'
import { format } from 'timeago.js';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket

const ChatForm = () => {

    const [content, setContent] = useState("")
    const [message, setMessage] = useState([])
    const [socketConnected,setSocketConnected] = useState(false)


    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup",user)
        socket.on("connection",()=>setSocketConnected(true))
        socket.emit("join chat",id)
    }, [])


    const user = useSelector(selectUser)

    const id = useSelector(selectSelectChat)

  
    useEffect(()=>{
        socket.on("message recieved",(newMessageRecieved)=>{
            if(newMessageRecieved.chat._id !== id){
                // notification
            }else{
                setMessage([...message,newMessageRecieved])
            }
        })
    })

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios.get(`/message/${id}`, config)
            .then(res => setMessage(res.data))
    }, [message])

    const handleMessage = async (e) => {
        e.preventDefault()

        if (!content) return;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const {data} = await axios.post('/message', { chatId: id, content }, config)
        socket.emit("new message",data)
        setContent("")
    }

    return (
        <>
            <Container className='chatform'>
                {message?.length > 0 && message.map(({ content, sender, createdAt }, i) =>
                    <div key={i} className='chatoutline'>
                        <Row>
                            <Col>
                                <h3>
                                    <Badge bg={sender._id !== user._id ? "primary" : "danger"}>
                                        {content}{" "}</Badge>
                                </h3>
                            </Col>
                            <Col>
                                <p className='text-end'>{format(createdAt)}</p>
                            </Col>
                        </Row>
                    </div>)}
            </Container>
            {message &&

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="search"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2" role='button' onClick={handleMessage}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </InputGroup.Text>
                </InputGroup>
            }
        </>
    )
}

export default ChatForm
