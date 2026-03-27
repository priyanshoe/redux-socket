import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const chatBoxSlice = createSlice({
    name: "chatBox",
    initialState: {
        isOpen: false,
        receiver: ""
    },
    reducers: {
        openChat: (state, actions: PayloadAction<{ receiver: string }>) => {
            state.isOpen = true,
                state.receiver = actions.payload.receiver
        },
        closeChat: (state) => {
            state.isOpen = false,
                state.receiver = ""
        }
    }
})

export const { openChat, closeChat } = chatBoxSlice.actions
export default chatBoxSlice.reducer