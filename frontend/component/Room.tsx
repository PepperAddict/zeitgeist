import React from 'react';

import '../styles/room.styl';
import Columns from './Columns';
import { Redirect } from 'react-router-dom'
import { REMOVE_All } from '../helpers/graphql';
import { useMutation } from '@apollo/client';
import logo from '../../public/images/zeitgeist.svg';
import Action from './Action';
import { setName, setMode } from '../redux/states.js';
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
        dispatch(setMode('START'))
        removeAll();
    }

    return <div className="main-container"><span className="logo-word">
        <img src={logo} alt="logo" className="logo-room" />ZEITGEIST</span>
        <Columns />
        <Action />
        <span className="clear" onClick={() => clearAll()}>clear everything</span>
    </div>
}