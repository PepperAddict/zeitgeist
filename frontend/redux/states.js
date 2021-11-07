import {createSlice} from '@reduxjs/toolkit';
import {useState, useEffect} from 'react';

export const theUser = createSlice({
    name: 'user',
    initialState: {
        value: localStorage.getItem('name')
    },
    reducers: {
        setName: (state, data) => {
            
            localStorage.setItem('name', data.payload);
            return {
                ...state, 
                value: localStorage.getItem('name')
            }
        }
    }
})

export const theText = createSlice({
    name: 'text', 
    initialState: {
        value: ''
    },
    reducers: {
        setText: (state, data) => {
            return {
                ...state, 
                value: data.payload
            }
        }
    }
})


export const theModal = createSlice({
    name: 'modal', 
    initialState: {
        value: {open: false, message: ''}
    },
    reducers: {
        setModal: (state, data) => {
            return {
                ...state, 
                value: data.payload
            }
        }
    }
})


export const theMode = createSlice({
    name: 'mode', 
    initialState: {
        value: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'START'
    },
    reducers: {
        setMode: (state, data) => {
            localStorage.setItem('mode', data.payload);
            return {
                ...state, 
                value: localStorage.getItem('mode')
            }
        }
    }
})

export const {setName} = theUser.actions 
export const {setMode} = theMode.actions
export const {setText} = theText.actions
export const {setModal} = theModal.actions