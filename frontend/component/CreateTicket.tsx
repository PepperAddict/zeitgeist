import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../redux/states.js';

export default function CreateTicket({ message }) {
    const [jira, setJira] = useState(false);
    const [copy, setCopy] = useState(false);


    const createTicket = async () => {
        navigator.clipboard.writeText(message).then(() => {
            console.log('copied successful')
            setCopy(true);
        }, (err) => {
            console.log('copy didnt work')
        })

    }

    return (<>
        {!copy ? <span onClick={() => createTicket()} className="createTicket">🗒 copy</span> : <span className="createTicket"> ✓ copied</span>}

    </>
    )
}