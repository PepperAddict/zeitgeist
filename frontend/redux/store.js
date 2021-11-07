import { configureStore } from '@reduxjs/toolkit'
import {theUser, theMode, theText, theModal} from './states'

export default configureStore({
    reducer: {
        user: theUser.reducer, 
        mode: theMode.reducer,
        text: theText.reducer,
        modal: theModal.reducer
    }
})