import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './features/isLoggedIn'
import chatBoxReducer from './features/chatBox'
import { newMessageReducer, messageStackReducer } from './features/message'

export const store = configureStore({
    reducer: {
        log: loggedReducer,
        chatBox: chatBoxReducer,
        newMessage: newMessageReducer,
        message: messageStackReducer
    },
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch