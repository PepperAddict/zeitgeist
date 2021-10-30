import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import '../styles/room.styl';
import Columns from './Columns';
import {Redirect} from 'react-router-dom'
import { REMOVE_All } from '../helpers/graphql';
import { useMutation } from '@apollo/client';

export default function Room() {
    const [removeAll] = useMutation(REMOVE_All)
    const user = useSelector((state: RootStateOrAny) => state.user.value);

    if (!user) {
        return <Redirect to="/" />
    }

    const clearAll = () => {
        removeAll();
    }

    return <div className="main-container">
        <Columns />
        <span className="clear" onClick={() => clearAll()}>clear</span>
    </div>
}