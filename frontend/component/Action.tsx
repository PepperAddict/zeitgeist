import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Column from './Column';
import Cookies from 'js-cookie';
import jiraLogo from '../../public/images/atlassian.png'
import '../styles/action.styl'
import { CHANGE } from '../helpers/graphql';
import { useMutation } from '@apollo/client';
import Modal from 'react-modal'
import { setName, setMode, setModal, setText } from '../redux/states.js';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export default function Action() {
    let subtitle;
    const text = useSelector((state: RootStateOrAny) => state.text.value);
    const [detected, setDetected] = useState(false);
    const [jira, setJira] = useState(false);
    const [changeColumn] = useMutation(CHANGE)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [issueType, setIssueType] = useState('')
    const dispatch = useDispatch();
    const modal = useSelector((state: RootStateOrAny) => state.modal.value);
    const [message, setText] = useState(modal.message)
    const [projectKey, setProjectKey] = useState('')


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        dispatch(setModal({ open: false, message: '' }))
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
        } catch (err) {
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
        window.location.href = "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=gWyH77E9dl4mCklEVWjXuX67WJuZmVeA&scope=read%3Ajira-user%20write%3Ajira-work%20read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fjira&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent"
    }

    const createTicket = () => {
        
        event.preventDefault();
        let mess;
        if (message.length > 0) {
            mess = message;
        } else {
            mess = modal.message
        }

        console.log(mess, issueType);
    }

    const searchKey = () => {
        console.log(projectKey)
    }

    return (
        <>
            {/* <div className="jiraContainer" >

                {!jira ? <span onClick={AuthenticateJira} className="jiraTrigger"> <img src={jiraLogo} alt="atlassian" className="logoTwo" />  ❌ Not Connected</span> :
                    <span className="jiraNonTrigger"><img src={jiraLogo} alt="atlassian" className="logoTwo" />  ✅ Connected</span>
                }</div> */}


            <div className="dragHere" onDragEnter={e => dropped(e)}>DRAG HERE
                <span>Drag a message pass this line to convert it to an action item</span>
            </div>

            <Column column="ACTION" action={true} />

            {/* <Modal
                isOpen={modal.open}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="modalStyle"
                contentLabel="Example Modal"
            >
                <span className="close" onClick={closeModal}>close</span>
                <div>Let's create a Jira ticket</div>
                <input placeholder="Enter Jira Project Key" onChange={(e) => setProjectKey(e.target.value)} />
                <button onClick={searchKey}>Search Project</button>
                <form onSubmit={createTicket}>

                    <label>
                        <p>issueType</p>
                        <input list="issueTypes" name="issueTypes" onChange={e => setIssueType(e.target.value)}/>
                        <datalist id="issueTypes">
                            <option value="Bug" />
                            <option value="Task" />
                            <option value="Epic" />
                            <option value="Story" />
                            <option value="Change" />
                            <option value="Support" />
                        </datalist>
                        </label>
                    <label>
                    <p>message</p>
                    <textarea defaultValue={modal.message} onChange={(e) => setText(e.target.value) }/>
                    </label>
                    <button type="submit">the modal</button>
                </form>
            </Modal> */}

        </>
    )
}