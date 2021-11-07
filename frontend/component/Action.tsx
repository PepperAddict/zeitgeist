import React, {useState} from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Column from './Column';
export default function Action() {
    const text = useSelector((state: RootStateOrAny) => state.text.value);
    const [detected, setDetected] = useState(false)

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(text)
        setDetected(true);
    }

    const dropped = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('droppppedddd')
    }
    return (
        <>
        {!detected ? <p onDragEnter={e => handleDrag(e)}>action</p>
        : 
        <div onDragEnter={dropped}>
            Start a ticket
        </div>
        }
        <Column column="ACTION" />

        </>
    )
}