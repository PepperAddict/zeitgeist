import { useMutation, useSubscription } from '@apollo/client';
import React, { useState } from 'react';
import { POST_MESSAGE, WATCH_MESSAGE, REMOVE_MESSAGE } from '../helpers/graphql';
import { RootStateOrAny, useSelector } from 'react-redux';
import '../styles/columns.styl'
//This is for deleting a message if it belongs to the user
function DeleteMessage({ id }) {
    const [removeMessage] = useMutation(REMOVE_MESSAGE)
    const initiateRemoval = () => {
        removeMessage({ variables: { id } })
    }
    return <span onClick={() => initiateRemoval()}>✖</span>
}

function Message ( props) {
    const {message, user, name, _id} = props;
    const [hide, setHide] = useState(true);
    return <p className="chat" key={_id}> <strong> {message}</strong> {(user === name) && <DeleteMessage id={_id} />}  </p>
}

function Messages(props) {

    return (<div className="chat-container">
        {props.messages.sort((a, b) => b._id - a._id).map(({ _id, name, message, column }) => {
            if (column.toLowerCase() === props.theColumn.toLowerCase()) {
                return <Message {...props} name={name} _id={_id} message={message} key={_id}/>
            } 
        })}
    </div>
    )
}

export default function Column({ column }) {
    const user = useSelector((state: RootStateOrAny) => state.user.value);
    const [message, setMessage] = useState('');

    const [sendMessage] = useMutation(POST_MESSAGE);
    const { loading, error, data } = useSubscription(WATCH_MESSAGE);

    const submitForm = (e) => {
        e.preventDefault();


        if (message.length > 1) {
            console.log(user, message, column)
            sendMessage({
                variables: {
                    theUser: user,
                    theMessage: message,
                    theColumn: column
                }
            })
        }

        setMessage('')


    }

    return (
        <div className="column-container">
            <h2>{column}</h2>
            {data && <Messages messages={data.newMessages} user={user} theColumn={column} />}

            <form onSubmit={(e) => submitForm(e)}>

                <label>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>

                <button type="submit">Add</button>
            </form>

        </div>
    )
}