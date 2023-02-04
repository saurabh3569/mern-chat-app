import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ChatForm from '../components/ChatForm';
import Sidebar from '../components/Sidebar';
import SearchUser from '../components/SearchUser'
import { selectIsSearch, selectSelectChat } from '../features/userSlice';
import './style.css'
import UserList from '../components/UserList';



const Chat = () => {

    const id = useSelector(selectSelectChat)
    const isUserSearch = useSelector(selectIsSearch)
   

    return (
        <Row className='mainchat'>
            <Col sm={2}>
                <SearchUser />
                {!isUserSearch ? <Sidebar /> : <UserList />}
            </Col>
            <Col sm={10}>
                {id ? <ChatForm /> : <h1 className='text-center mt-5'>Pls Select Chat</h1>}
            </Col>
        </Row>
    )
}

export default Chat

