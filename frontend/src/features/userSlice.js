import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({

    name: "user",
    initialState: {
        user: null,
        selectChat: null,
        isSearch: null,
        userList: null,
        newChatId:null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setSelectChat: (state, action) => {
            state.selectChat = action.payload
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload
        },
        setUserList: (state, action) => {
            state.userList = action.payload
        },
        setNewChatId: (state, action) => {
            state.newChatId = action.payload
        },
    }
})

export const { setUser, setSelectChat, setIsSearch, setUserList, setNewChatId } = userSlice.actions

export const selectUser = (state) => state.user.user
export const selectSelectChat = (state) => state.user.selectChat
export const selectIsSearch = (state) => state.user.isSearch
export const selectUserList = (state) => state.user.userList
export const selectNewChatId = (state) => state.user.newChatId

export default userSlice.reducer    