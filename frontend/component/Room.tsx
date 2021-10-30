import React from 'react';

import '../styles/room.styl';
import Columns from './Columns';
import {Redirect} from 'react-router-dom'
import { REMOVE_All } from '../helpers/graphql';
import { useMutation } from '@apollo/client';

import { setName } from '../redux/states.js';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

export default function Room() {
    const [removeAll] = useMutation(REMOVE_All)
    const user = useSelector((state: RootStateOrAny) => state.user.value);
    const dispatch = useDispatch()
    if (!user) {
        return <Redirect to="/" />
    }

    const clearAll = () => {
        dispatch(setName(''))
        removeAll();
    }

    return <div className="main-container">
        <Columns />
        <span className="clear" onClick={() => clearAll()}>clear</span>
    </div>
}