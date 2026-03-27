import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const chatBoxSlice = createSlice({
    name: "chatBox",
    initialState: {
        isOpen: false,
        name: "Demo"
    },
    reducers: {
        openChat: (state, name: PayloadAction<string>) => {
            state.isOpen = true,
                state.name = name.payload
        },
        closeChat: (state) => {
            state.isOpen = false,
                state.name = ""
        }
    }
})

export const { openChat, closeChat } = chatBoxSlice.actions
export default chatBoxSlice.reducer