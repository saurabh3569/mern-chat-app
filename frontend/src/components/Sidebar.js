import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSearch, selectUser, setSelectChat } from '../features/userSlice'
import './style.css'

const Sidebar = () => {

    const user = useSelector(selectUser)

    const [chat, setChat] = useState([])
    const [select, setselect] = useState(null)
    const isUserSearch = useSelector(selectIsSearch)


    const dispatch = useDispatch()


    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios.get('/chat', config)
            .then(res => (setChat(res.data)))
    }, [chat])

    const clickHandler = (id) => {
        dispatch(setSelectChat(id))
        setselect(id)
    }

    return (
        <div className='sidebar'>
            {chat.length > 0 && <Container>
                {chat?.map(({ chatname, isGroupChat, _id, users }, i) => (
                    <Row key={i} className={select === _id && 'bg-warning'}>
                        <Col sm={2}>
                            {!isGroupChat &&
                                <img className='isGroupChatImg' alt='img' src={users[0]._id !== user._id ? users[0].pic : users[1].pic} />}
                            {isGroupChat && <img className='isGroupChatImg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUNZMqU1l3ov2juDCWglT2ayWvD2rpF6RBQ&usqp=CAU' alt='img' />}
                        </Col>
                        <Col>
                            <h5 role='button' onClick={() => clickHandler(_id)}>{users[0]._id !== user._id ? users[0].name : users[1].name}</h5>
                        </Col>
                    </Row>

                ))}
            </Container>}
            {!isUserSearch && chat.length === 0 && <Container className='text-danger'>Pls Search User and Start Chatting</Container>}
        </div>
    )
}

export default Sidebar
