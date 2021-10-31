import React from 'react';
import Bubbles from './three'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';


export default function Background() {
    const mode = useSelector((state: RootStateOrAny) => state.mode.value)
    return (
 <Bubbles /> 
    
    )
}