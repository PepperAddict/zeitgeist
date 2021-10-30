import {createSlice} from '@reduxjs/toolkit';
import {useState, useEffect} from 'react';

export const theUser = createSlice({
    name: 'user',
    initialState: {
        value: localStorage.getItem('name')
    },
    reducers: {
        setName: (state, data) => {
            localStorage.setItem('name', data);
            return {
                ...state, 
                value: localStorage.getItem('name')
            }
        }
    }
})



export const theMode = createSlice({
    name: 'mode', 
    initialState: {
        value: 'bubbles'
    },
    reducers: {
        setMode: (state, data) => {
            return {
                ...state, 
                value: data.payload
            }
        }
    }
})

export const {setName} = theUser.actions 
export const {setMode} = theMode.actions
