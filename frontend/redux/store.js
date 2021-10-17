import { configureStore } from '@reduxjs/toolkit'
import {theUser, theMode} from './states'

export default configureStore({
    reducer: {
        user: theUser.reducer, 
        mode: theMode.reducer
    }
})