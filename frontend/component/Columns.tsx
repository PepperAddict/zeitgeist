import React, { useState } from 'react';
import Column from './Column';
import '../styles/columns.styl'


export default function Columns() {
    const [col, setCol] = useState('START')
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