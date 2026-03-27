import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const newMessageSlice = createSlice({
    name: 'new-message',
    initialState: {
        sender: "",
        receiver: "",
        message: ""
    },
    reducers: {
        setNewMessage: (state, actions: PayloadAction<{ message: string, sender: string, receiver: string }>) => {
            state.message = actions.payload.message
            state.receiver = actions.payload.receiver
            state.sender = actions.payload.sender
        }
    }
})

export const { setNewMessage } = newMessageSlice.actions
export const newMessageReducer = newMessageSlice.reducer

type Message = {
    sender: string;
    receiver: string;
    message: string;
    time?: number;
};
const initialState: Message[] = []
export const messageStackSlice = createSlice({

    name: 'message-stack',
    initialState,
    reducers: {
        pushMessage: (state, actions: PayloadAction<Message>) => {
            // const data = {
            //     sender: actions.payload.sender,
            //     receiver: actions.payload.receiver,
            //     message: actions.payload.message,
            //     time: Date.now()
            // }
            state.push({
                ...actions.payload,
                time: Date.now()
            })
        }

    }
})


export const { pushMessage } = messageStackSlice.actions
export const messageStackReducer = messageStackSlice.reducer