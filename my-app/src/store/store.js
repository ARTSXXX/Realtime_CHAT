import {configureStore} from '@reduxjs/toolkit'
import messageReducer from '../components/messageSlice.js'


export const store = configureStore({
    reducer: {
        message: messageReducer
    }

})