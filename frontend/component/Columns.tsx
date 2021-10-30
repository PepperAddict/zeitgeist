import React, {useState} from 'react';
import Column from './Column';

export default function Columns() {
    const [col, setCol] = useState('START')
    return (
        <div className="roomColumnsContainer">
        <div>
            <span onClick={() => setCol('START')}>Start</span>
            <span onClick={() => setCol('STOP')}>Stop</span>
            <span onClick={() => setCol('CONTINUE')}>Continue</span>
        </div>
        <Column column={col}  />
        </div>
    )
}