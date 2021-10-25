import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import '../styles/room.styl';
import Columns from './Columns';
import {Redirect} from 'react-router-dom'

export default function Room() {
    const user = useSelector((state: RootStateOrAny) => state.user.value);

    if (!user) {
        return <Redirect to="/" />
    }

    return <div className="main-container">
        <Columns />
    </div>
}