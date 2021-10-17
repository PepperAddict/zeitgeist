import {createSlice} from '@reduxjs/toolkit'

export const theUser = createSlice({
    name: 'user',
    initialState: {
        value: 'user'
    },
    reducers: {
        setName: (state, data) => {
            return {
                ...state, 
                value: data.payload
            }
        }
    }
})


export const {setName} = theUser.actions 
