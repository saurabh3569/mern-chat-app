import axios from 'axios'
import React from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { selectIsSearch, selectUser, selectUserList, setIsSearch } from '../features/userSlice'

const UserList = () => {

    const userList = useSelector(selectUserList)

    const dispatch = useDispatch(selectIsSearch)


    const user = useSelector(selectUser)



    const handleClick = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        await axios.post('/chat', { userId: id }, config)
        toast.success('chat created successfully')

        dispatch(setIsSearch(false))
    }

    return (
        <Container>
            <ToastContainer
                position="bottom-center"
                theme="dark"
            />
            {userList?.length > 0 ? userList.map(({ name, _id }, i) => (
                <Row key={i}>
                    <Col>
                        <Badge className='searchBadge' key={i} role='button' onClick={() => handleClick(_id)}>{name}</Badge>
                    </Col>
                </Row>
            ))
                : <p className='text-danger'>No User Found with this Name or Email</p>
            }
        </Container>
    )
}

export default UserList
