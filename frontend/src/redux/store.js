import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chatSlice';
import chatContentReducer from './features/chatContentSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        chatContentReducer: chatContentReducer
    },
})