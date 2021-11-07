import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Column from './Column';
import Cookies from 'js-cookie';
import jiraLogo from '../../public/images/atlassian.png'
import '../styles/action.styl'
import { CHANGE } from '../helpers/graphql';
import { useMutation } from '@apollo/client';

export default function Action() {
    const text = useSelector((state: RootStateOrAny) => state.text.value);
    const [detected, setDetected] = useState(false);
    const [jira, setJira] = useState(false);
    const [changeColumn] = useMutation(CHANGE)


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDetected(true);
    }

    const dropped = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            changeColumn({
                variables: {
                    id: text,
                    column: "ACTION"
                }
            })
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const code = Cookies.get('code');
        if (code) {
            setJira(true)
        }
    }, [])

    const AuthenticateJira = () => {
        //window.location.href = "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=gWyH77E9dl4mCklEVWjXuX67WJuZmVeA&scope=read%3Ajira-user%20write%3Ajira-work%20read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fjira&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent"
    }

    return (
        <>
            <div className="jiraContainer" >
                <img src={jiraLogo} alt="atlassian" className="logoTwo" />
                {!jira ? <span onClick={AuthenticateJira}> ❎ Connect</span> :
                    <span> ✅ Connected</span>
                }</div>

            {jira && <>
            {!detected ? <p onDragEnter={e => handleDrag(e)}>Drag a message here</p>
                :
                <div onDragEnter={dropped}>
                    Start a ticket
                </div>
            }
            <Column column="ACTION" action={true} />
            </> }


        </>
    )
}