import { useMutation } from '@apollo/client';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { REMOVE_MESSAGE } from '../helpers/graphql.js';
import '../styles/room.styl';
import Column from './Column';

//This is for deleting a message if it belongs to the user
function DeleteMessage({ id }) {
    const [removeMessage] = useMutation(REMOVE_MESSAGE)
    const initiateRemoval = () => {
        removeMessage({ variables: { id } })
    }
    return <span onClick={() => initiateRemoval()}>✖</span>
}



export default function Room() {

    const user = useSelector((state: RootStateOrAny) => state.user.value);


    // if (!user) {
    //     return <Redirect to="/" />
    // }

    return <div className="main-container">


        <Column column="Start" />
        <Column column="Stop" />
        <Column column="Continue" />

    </div>
}