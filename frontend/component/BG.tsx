import React from 'react';
import Bubbles from './three'
import Clouds from './three2'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { setMode } from '../redux/states.js';

export default function Background() {
    const mode = useSelector((state: RootStateOrAny) => state.mode.value)
    return (
        <div className="mode-container">
            {mode === 'bubbles' && <Bubbles /> }

            
     </div>
    )
}