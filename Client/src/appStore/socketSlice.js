import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        selectSocket: null, // The socket will be initialized later
    },
    reducers: {
        setSelectSocket: (state, action) => {
            state.selectSocket = action.payload;
        },
    },
});

export const { setSelectSocket } = socketSlice.actions;
export const selectSocket = (state) => state.socket.socketInstance;

export default socketSlice.reducer;
