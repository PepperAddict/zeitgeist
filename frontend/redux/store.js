import { configureStore } from '@reduxjs/toolkit'
import {theUser, theMode, theText} from './states'

export default configureStore({
    reducer: {
        user: theUser.reducer, 
        mode: theMode.reducer,
        text: theText.reducer
    }
})