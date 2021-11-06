import { useMutation, useSubscription } from '@apollo/client';
import React, { useState, useRef, useEffect } from 'react';
import { POST_MESSAGE, WATCH_MESSAGE, REMOVE_MESSAGE, UPVOTE } from '../helpers/graphql';
import { RootStateOrAny, useSelector } from 'react-redux';
import '../styles/columns.styl';
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, "eastus")
let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput()
let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)
//This is for deleting a message if it belongs to the user
function DeleteMessage({ id }) {
    const [removeMessage] = useMutation(REMOVE_MESSAGE)
    const initiateRemoval = () => {
        removeMessage({ variables: { id } })
    }
    return <span onClick={() => initiateRemoval()}>✖</span>
}

function Like({ id, like, name }) {
    const [upVote] = useMutation(UPVOTE);
    const user = useSelector((state: RootStateOrAny) => state.user.value);

    const upvote = () => {
        try {
            upVote({
                variables: {
                    id: id,
                    like: like + 1
                }
            })
        } catch (err) {
            console.log(err)
        }

    }
    return (<div> {(user === name) && <><span className="pointer" onClick={() => upvote()}>👍</span><span className="upvote">  {like} </span> </>} </div>)
}
function Message(props) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef();
    const [pressed, setPressed] = useState(false);
    const { message, user, name, _id, column, like } = props;

    useEffect(() => {
        if (ref.current) {
            ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
        }
    }, [position])

    const onMouseMove = (e) => {
        if (pressed) {
            setPosition({
                x: position.x + e.movementX,
                y: position.y + e.movementY
            })
        }
    }
    return <span
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className="message" key={_id}><p className={"chat pointer bg-" + column} > {message}{(user === name) && <DeleteMessage id={_id} />} </p> <Like id={_id} like={like} name={name} /></span>
}

function Messages(props) {

    return (<div className="chat-container">
        {props.messages.sort((a, b) => b._id - a._id).map(({ _id, name, message, column, like }) => {
            if (column.toLowerCase() === props.theColumn.toLowerCase()) {
                return <Message {...props} name={name} _id={_id} message={message} key={_id} column={column} like={like} />
            }
        })}
    </div>
    )
}

export default function Column({ column }) {
    const user = useSelector((state: RootStateOrAny) => state.user.value);
    let [message, setMessage] = useState('')
    const inputText = useRef();
    const [sendMessage] = useMutation(POST_MESSAGE);
    const { loading, error, data } = useSubscription(WATCH_MESSAGE);
    const [listening, setListening] = useState(false);
    const [audio, setAudio] = useState('' as any);


    const submitForm = () => {
        event.preventDefault();

        if (message.length > 1) {
            try {
                sendMessage({
                    variables: {
                        theUser: user,
                        theMessage: message,
                        theColumn: column,
                        theLike: 0
                    }
                })
                setMessage('')
            } catch (err) {
                console.log(err)
            }

        }



    }

    const stopListening = () => {
        audio.getTracks().forEach(
            (track) => {
                track.stop();

            });


        submitForm();
        window.location.reload();
        setListening(false);
    }

    const initiate = () => {
        setListening(true);

        if (navigator.mediaDevices) {

            navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {

                recognizer.startContinuousRecognitionAsync();
                setAudio(stream)
                recognizer.recognized = (s, e) => {
                    if (e.result.text) {

                        setMessage(message += ' ' + e.result.text)
                        if (e.result.text.toLowerCase().includes('send comment')) {
                            submitForm();
                            message = ''
                            setMessage('')
                        }
                        if (e.result.text.toLowerCase().includes('stop listening')) {
                            submitForm();
                            window.location.reload();
                        }

                    }

                };


            })
        }


    }



    return (
        <div className={"column-container col-" + column}>
            <form onSubmit={(e) => submitForm()}>
                <label>
                    <textarea value={message} ref={inputText} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a comment" />

                    <div className="listeningContainer">
                        {!listening ? <span onClick={initiate} className="listen">🎤 LISTEN</span> :
                            <span className="active" onClick={stopListening}>To submit, say: <span className="sayThis">Send comment</span>. <br /> Click or say: <span className="sayThis">Stop Listening</span> to end</span>}
                    </div>
                </label>


                <button type="submit">Add</button>
            </form>
            {data && <Messages messages={data.newMessages} user={user} theColumn={column} />}
        </div>
    )
}