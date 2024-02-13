import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedContent: null,
}

export const chatContentSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectContent: (state = initialState, action) => {
            return {
                ...state,
                selectedContent: action.payload
            }
        },
        removeUser: (state = initialState, action) => {
            state.selectedContent.users = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { selectContent, removeUser } = chatContentSlice.actions

export default chatContentSlice.reducer