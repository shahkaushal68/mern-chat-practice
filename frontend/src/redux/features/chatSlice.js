import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedChat: null,
    loginUserDetails: null
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectUser: (state = initialState, action) => {
            return {
                ...state,
                selectedChat: action.payload
            }
        },
        loginUser: (state = initialState, action) => {
            return {
                ...state,
                loginUserDetails: action.payload
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectUser, loginUser, logoutUser } = chatSlice.actions

export default chatSlice.reducer