import axios from 'axios'
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsSearch, selectUser, setIsSearch, setUserList } from '../features/userSlice'

const SearchUser = () => {

    const [search, setSearch] = useState("")

    const dispatch = useDispatch(selectIsSearch)

    const user = useSelector(selectUser)

    const searchHandler = async (e) => {
        e.preventDefault()

        if (!search) return

        dispatch(setIsSearch(true))

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const res = await axios.get(`/user?search=${search}`, config)
        dispatch(setUserList(res.data))

    }


    return (
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2" role='button' onClick={searchHandler}>
                <i className="fa-solid fa-magnifying-glass" ></i>
            </InputGroup.Text>
        </InputGroup>

    )
}

export default SearchUser
