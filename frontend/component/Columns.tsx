import React, { useState, useEffect } from 'react';
import Column from './Column';
import '../styles/columns.styl'
import { setMode } from '../redux/states.js';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

export default function Columns() {
    
    const mode = useSelector((state: RootStateOrAny) => state.mode.value);
    const dispatch = useDispatch()
    const [col, setCol] = useState(mode)

    useEffect(() => {
            if (col) {
                dispatch(setMode(col))
            }
            
    }, [col])

    return (
        <div className="roomColumnsContainer">
            <div className="tabs-container">
                <div className="tab col-START" onClick={() => setCol('START')}>START</div>
                <div className="tab col-STOP" onClick={() => setCol('STOP')}>STOP</div>
                <div className="tab col-CONTINUE" onClick={() => setCol('CONTINUE')}>CONTINUE</div>
            </div>
            <Column column={col} />
        </div>
    )
}