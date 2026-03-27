import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const loggedSlice = createSlice({
    name: "loginData",
    initialState: {
        loggedIn: false,
        name: ""
    },
    reducers: {
        logIn: (state, name: PayloadAction<string>) => {
            state.loggedIn = true
            state.name = name.payload
        },
        logOut: (state) => {
            state.loggedIn = false
            state.name = ""
        }
    }
})

export const { logIn, logOut } = loggedSlice.actions
export default loggedSlice.reducer