/**
 * /* eslint-disable no-shadow
 *
 * @format
 */

/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

/**
 * /* eslint-disable no-undef
 *
 * @format
 */

import React, { useState, Suspense, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as action from '../../store/actions/'

import Navigation from '../../components/classroom/UI/NavBar'
import Convo from './Conversation'
import Editor from '../../components/classroom/Editor/Editor'
import Preview from '../../components/classroom/Editor/Preview'
import Seo from '../../components/SEO/helmet'
import Modal from '../../components/Partials/Modals/Modal'
import Input from '../../components/Partials/Input/Input'
import Spinner from '../../components/Partials/Preloader'
import ParticipantModal from '../../components/classroom/Participants/Modal'
// import AudioBroadcast from '../../components/classroom/Audio/Audio';

import { CLASSROOM_FILE_DOWNLOAD } from '../../config/api_url'
import './css/Environment.css'

const host =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? process.env.REACT_APP_REMOTE_API_URL
        : process.env.REACT_APP_LOCAL_API_URL

const socket = io(`${host}classrooms`, {
    reconnection: true,
    reconnectionDelay: 6000,
    reconnectionDelayMax: 6000,
    reconnectionAttempts: 9
})
toast.configure({
    autoClose: 6000,
    draggable: true
})

// const localVideoRef = useRef(null);

const MainClassLayout = ({
    ownerid,
    data,
    owner,
    name,
    description,
    username,
    userid,
    topic,
    onClassroomVerify,
    pinnedMessages,
    started,
    cid,
    cd,
    kid
}) => {
    const [inputState, setInputState] = useState({
        value: '',
        isFocused: false,
        lastSentMessage: null
    })

    const [codemarkastate, setcodemarkaState] = useState({
        messages: [],
        editors: [],
        previewContent: {
            html: null,
            css: null
        },
        owner,
        users: [],
        editorPriviledge: owner,
        typingState: [],
        favourite: null,
        submitted: false,
        pinnedMessages: [],
        redirect: false,
        starRated: null,
        blocked: false,
        numberInClass: 0,
        sdemitted: null,
        countDownTime: 5,
        ended: false,
        started: null,
        starting: null
    });

    const [userSpecificMessages, setUserSpecificMessages] = useState([]);
    const [userInvitationData, setUserInvitationData] = useState({ value: '', socketFeedback: null, socketFeedbackStatus: null });

    const startCountDonwTimer = () => {
        let t = 5
        const updateCounter = ct => {
            setcodemarkaState(s => {
                t--
                return { ...s, countDownTime: ct - 1 }
            })
        }
        const inter = setInterval(() => {
            if (t !== 0) {
                updateCounter(t)
            } else {
                clearInterval(inter)
            }
        }, 1000)
    }

    const [ClassroomInformation, setClassroomInformation] = useState({
        cname: {
            value: name
        },
        cdesc: {
            value: description
        },
        ctopic: {
            value: topic
        },
        submitted: false
    })

    const [
        ClassroomPinnedInformation,
        setClassroomPinnedInformation
    ] = useState({
        changed: false,
        value: ''
    })
    const connAttempts = useRef(0);
    const [inRoom, setInRoom] = useState(null)

    const redirectTo = (e, path) => {
        window.location.href = window.location.origin
    }

    const [starRating, setStarRating] = useState(0)

    React.useEffect(() => {
        const requestData = {
            classroom_id: cid || data.classroom_id,
            userId: userid,
            username
        }

        if (inRoom && owner && !started) {
            document.querySelector('#dialogueToStart').click()
        }

        if (inRoom !== true && inRoom === null && !codemarkastate.blocked) {
            // set listeners and emitters
            setInRoom(true)

            //listen for old message
            socket.on('updateMsg', msg => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages
                    msg.msgs.forEach(element => {
                        oldmsg.push(element)
                    })
                    return {
                        ...c,
                        messages: oldmsg,
                        pinnedMessages: pinnedMessages
                    }
                })
            })

            socket.on('rejoin_updateMsg', msg => {
                setcodemarkaState(c => {
                    const nnc = msg.newuserslist.filter(u => {
                        return String(u.id) !== String(userid)
                    })
                    return {
                        ...c,
                        messages: msg.msgs,
                        users: msg.newuserslist,
                        numberInClass: nnc.length
                    }
                })
            })

            socket.on('started_class', () => {
                setcodemarkaState(s => {
                    return { ...s, started: true, starting: null }
                })
                toast.success(
                    <div>
                        Heads Up!
                        <br />
                        Classroom session has started!{' '}
                    </div>
                )
            })

            // disconnect users previous session
            socket.on('disconnect_user_before_join', (data) => {
                if (data.userId === userid) {
                    socket.close();
                    toast.warn('Session terminated', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            });
            // tell server to add user to class
            socket.emit('join', requestData);

            //listen for bot messaage
            socket.on('botWelcome', msg => {
                setUserSpecificMessages(c => [...c, msg])
            })

            //listen for new members added
            socket.on('someoneJoined', msg => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages;
                    oldmsg.push(msg)
                    const nnc = msg.newuserslist.filter(u => {
                        return u.id !== userid
                    })
                    return {
                        ...c,
                        messages: oldmsg,
                        users: msg.newuserslist,
                        numberInClass: nnc.length
                    }
                })
                setcodemarkaState(c => {
                    if (c.messages && c.messages.length > 0) {
                        const len = c.messages.length
                        const lastIndex = len - 1
                        const ele = c.messages[lastIndex].msgId
                        const lelem = document.getElementById(ele)

                        lelem.scrollIntoView(false)
                    }
                    return c
                })
            })

            socket.on('disconnect', reason => {
                socket.emit('leave', requestData)

                if (reason === 'io server disconnect') {
                    // the disconnection was initiated by the server, you need to reconnect manually
                    socket.connect()
                }
                if (connAttempts.current > 3) {
                    toast.warn('Disconnected from classroom', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                }
            })

            socket.on('rated_class', rated => {
                setcodemarkaState(s => {
                    return { ...s, starRated: rated }
                })
            })

            socket.on('reconnecting', attemptNumber => {
                connAttempts.current++
                if (attemptNumber > 3) {
                    toast.info(
                        'Attempting to reconnect to classroom,please wait...'
                    )
                }
            })

            socket.on('star_rating_failed', reason => {
                toast.warning(
                    <div>
                        Heads Up!
                        <br />
                        Rating failed,{reason}
                    </div>
                )
            })

            socket.on('reconnect_error', error => {
                if (connAttempts.current >= 3) {
                    toast.warn(
                        'Reconnection failed, try refreshing this window'
                    )
                }
            })

            socket.on('reconnect', attemptNumber => {
                socket.emit('re_join', requestData)
                if (connAttempts.current >= 3) {
                    toast.success('Welcome back online!')
                }
                connAttempts.current = 0
            })

            //listen for new messages
            socket.on('nM', data => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages
                    oldmsg.push(data)
                    const newuserTypingList = c.typingState.filter(typist => {
                        return typist.id !== data.by
                    })
                    return {
                        ...c,
                        messages: oldmsg,
                        typingState: newuserTypingList
                    }
                })
                setcodemarkaState(c => {
                    if (c.messages) {
                        const len = c.messages.length
                        const lastIndex = len - 1

                        const ele = c.messages[lastIndex].msgId
                        const lelem = document.getElementById(ele)

                        lelem.scrollIntoView(false)
                    }
                    return c
                })
            })

            //listen for members leaving
            socket.on('updatechat_left', msg => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages
                    oldmsg.push(msg)

                    let newUserList = c.users.filter(user => {
                        return String(user.id) !== String(msg.for)
                    })
                    newUserList = newUserList.filter(u => {
                        return String(u.id) !== String(userid)
                    })
                    const newTypingState = c.typingState.filter(user => {
                        return String(user.id) !== String(msg.for)
                    })

                    return {
                        ...c,
                        messages: oldmsg,
                        users: newUserList,
                        numberInClass: newUserList.length,
                        typingState: newTypingState
                    }
                })

                setcodemarkaState(c => {
                    if (c.messages) {
                        const len = c.messages.length
                        const lastIndex = len - 1

                        const ele = c.messages[lastIndex].msgId

                        const lelem = document.getElementById(ele)

                        lelem.scrollIntoView(false)
                    }
                    return c
                })
            })

            socket.on('utyping', ({ username, userid }) => {
                setcodemarkaState(c => {
                    let found = false

                    c.typingState.forEach(typist => {
                        if (String(typist.id) === String(userid)) {
                            found = true
                        }
                    })

                    if (found) {
                        // user has typed and was recorded, don't do anything
                        return c
                    } else {
                        const oldT = c.typingState
                        oldT.push({ username, id: userid })
                        return { ...c, typingState: oldT }
                    }
                })
            })

            socket.on('shut_down_emitted', ({ by }) => {
                if (by !== userid) {
                    document.querySelector('#shutdownemitionbtn').click()
                    startCountDonwTimer()
                } else {
                    setcodemarkaState(s => {
                        return { ...s, sdemitted: true }
                    })
                }
            })

            socket.on('shut_down_now', () => {
                setcodemarkaState(s => {
                    return { ...s, ended: true }
                })
                if (!owner) {
                    socket.close()
                }
            });

            socket.on('utyping_cleared', ({ username, userid }) => {
                // remove user from typing list;

                setcodemarkaState(c => {
                    const newuserTypingList = c.typingState.filter(typist => {
                        return typist.id !== userid
                    })
                    return { ...c, typingState: newuserTypingList }
                })
            })

            socket.on('classroom_users', data => {
                setcodemarkaState(c => {
                    const uwt = data.filter(u => {
                        return u.id !== userid
                    })
                    return { ...c, users: data, numberInClass: uwt.length }
                })
            })

            // listen for classroom files
            socket.on('class_files', (css, html, js) => {
                // set editor state
                setcodemarkaState(c => {
                    return {
                        ...c,
                        editors: [
                            { file: 'css', ...css },
                            { file: 'html', ...html },
                            { file: 'js', ...js }
                        ]
                    }
                })

                // set preview state
                setcodemarkaState(c => {
                    return {
                        ...c,
                        previewContent: {
                            html,
                            css,
                            js
                        }
                    }
                })
            })

            socket.on('newuser_role', __d => {
                if (String(__d.id) === String(userid) && __d.role) {
                    setcodemarkaState(c => {
                        return {
                            ...c,
                            editorPriviledge: __d.role === '2' ? true : false
                        }
                    })
                    if (__d.role === '1') {
                        toast.info(
                            'You have been placed on restrictions to modify the Editors'
                        )
                    } else if (__d.role === '2') {
                        toast.info('You now have access to modify the Editors')
                    }

                    if (__d.assignedBy === String(userid) || owner) {
                        toast.info(
                            <div>
                                Heads Up!
                                <hr /> Access granted!{' '}
                            </div>
                        )
                    }
                }
            })

            //new like list
            socket.on('new_favourite_action', ({ liked, user }) => {
                if (user === userid) {
                    setcodemarkaState(c => {
                        return { ...c, favourite: liked }
                    })
                }
                if (owner && liked) {
                    toast.info('Hurray! New Classroom Favourite')
                }
                if (owner && !liked) {
                    toast.info('Too bad! Lost a Classroom Favourite')
                }
            })

            socket.on('newClassInformation', doc => {
                toast.success('Class Information updated!')
                setClassroomInformation(c => {
                    return { ...c, submitted: false }
                })
                onClassroomVerify(doc.Kid)
            })

            socket.on('blocking_user_success', ({ user, by, newStudents }) => {
                setcodemarkaState(s => {
                    return {
                        ...s,
                        users: newStudents,
                        blocked: userid === user.id
                    }
                })
                if (userid === user.id) {
                    setInRoom(r => false)

                    toast.info(
                        <div>
                            Heads Up!
                            <br /> You were kicked out from the classroom.
                        </div>
                    )
                }

                if (owner) {
                    toast.info(
                        <div>
                            Heads Up! <br />
                            {user.username} was kicked out.
                        </div>
                    )
                }
            })

            socket.on('blocking_user_failed', ({ user, reason }) => {
                const bfailedUsername = user.username

                toast.info(
                    <div>
                        Heads Up!
                        <br />
                        Failed to block {bfailedUsername}, because {reason}{' '}
                    </div>
                )
            })

            socket.on('user_waved', ({ from, to }) => {
                if (userid === to.id) {
                    toast.info(`${from} waved at you`)
                }
            })

            socket.on('star_rating_added', rat => {
                toast.success(
                    <div>
                        <b>Great!</b>
                        Your rating was recorded,please wait..
                    </div>
                )
                window.location.href = window.location.origin
            })

            socket.on('pinned_message_added', pmsg => {
                setcodemarkaState(c => {
                    return { ...c, submitted: false, pinnedMessages: pmsg }
                })
                toast.info(
                    <div>
                        <b>Heads Up!</b> <br /> New Pinned Message!`
                    </div>
                )
            })
            socket.on('error', () => {
                setcodemarkaState(c => {
                    return { ...c, submitted: false }
                })
                toast.warning(
                    <div>
                        <b>Whoops!!!</b> <br /> Something went wrong, try again later!
                    </div>
                )
            });

            socket.on('user_invite_failed', (reason) => {
                setcodemarkaState(c => {
                    return { ...c, submitted: false }
                })
                setUserInvitationData(c => {
                    return { ...c, value: '', socketFeedback: reason, socketFeedbackStatus: 0 }
                })
            });
            socket.on('invite_sent', () => {
                setcodemarkaState(c => {
                    return { ...c, submitted: false }
                })
                setUserInvitationData(c => {
                    return { ...c, value: '', socketFeedback: 'Great! Invitation was sent.', socketFeedbackStatus: 1 }
                })
            });

            socket.on('editor_update_error', (reason) => {
                toast.warning(
                    <div>
                        <b>Whoops!!!</b> <br />
                        Error updating work files on remote server.
                    </div>
                )
            })

            socket.on('class_favourites', likedList => {
                setcodemarkaState(c => {
                    let liked = false
                    likedList.forEach(list => {
                        if (String(list.id) === String(userid)) {
                            liked = true
                        }
                    })

                    if (liked) {
                        return { ...c, favourite: true }
                    } else {
                        return { ...c, favourite: false }
                    }
                })
            })
            //listen to file changes
            socket.on(
                'class_files_updated',
                ({ fid, file, content, editedBy }) => {
                    setcodemarkaState(c => {
                        // check preview states
                        console.log(c);
                        if (editedBy !== userid) {
                            let oldFiles
                            c.editors.forEach((element, i) => {
                                if (
                                    element.file === file &&
                                    element.id === fid
                                ) {
                                    oldFiles = c.editors
                                    oldFiles[i].content = content
                                }
                            })
                            return {
                                ...c,
                                editors: oldFiles,
                                previewContent: {
                                    ...c.previewContent,
                                    [file]: { content, id: fid }
                                }
                            }
                        } else {
                            return { ...c }
                        }
                    })
                }
            )
        } else if (codemarkastate.blocked && inRoom === false) {
            socket.close()
        }
    }, [
        codemarkastate.owner,
        codemarkastate.messages,
        cid,
        codemarkastate.blocked,
        started,
        userSpecificMessages,
        username,
        data.classroom_id,
        userid,
        inRoom,
        codemarkastate.username,
        codemarkastate.classroom_id,
        owner,
        pinnedMessages,
        onClassroomVerify
    ])

    const handleInputChange = e => {
        e.preventDefault()
        const value = e.target.value
        setInputState({ ...inputState, value })

        if (e.target.value.trim().length > 0) {
            socket.emit('user_typing', {
                username,
                userid,
                classroomid: data.classroom_id
            })
        } else {
            socket.emit('user_typing_cleared', {
                username,
                userid,
                classroomid: data.classroom_id
            })
        }
    }

    const collectEmoji = (emoji) => {
        setInputState({ ...inputState, value: `${inputState.value} ${emoji}` })
    }

    const handleMessageSubmit = e => {
        e.preventDefault()
        const getRandomColor = () => {
            const letters = [
                'rgb(188, 190, 219)',
                '#b99286',
                '#a4cc99',
                '#7f82bb',
                '#b3cc6e'
            ]
            let color

            color = letters[Math.floor(Math.random() * 5)]
            return color
        }
        if (inputState.value !== '') {
            setInputState({
                ...inputState,
                lastSentMessage: e.target.value,
                value: ''
            })

            const msg_data = {
                user: userid,
                class: data.classroom_id,
                message: inputState.value,
                time: new Date(),
                messageColor: getRandomColor()
            }
            socket.emit('newMessage', msg_data)
        }
    }

    const editorChanged = (e, o, v, t) => {
        let fid

        codemarkastate.editors.forEach(element => {
            if (element.file === t) {
                fid = element.id
            }
        })

        const emitObj = {
            file: t,
            content: v,
            class: data.classroom_id,
            user: data.user_id,
            id: fid,
            editedBy: userid,
            kid

        }

        setcodemarkaState(c => {
            return {
                ...c,
                previewContent: {
                    ...c.previewContent,
                    [t]: { content: v, id: fid }
                }
            }
        })

        if (o.origin === '+input') {
            if (o.text[0].trim() !== '' && o.text[0].trim().length === 1) {
                socket.emit('editorChanged', emitObj)
            }
        }

        if (o.origin === '+delete') {
            if (o.removed[0].trim() !== '') {
                socket.emit('editorChanged', emitObj)
            }
        }
        // if(o.origin === 'cut' && o.removed[0] !== ""){
        //   socket.emit("editorChanged", emitObj);
        // }

        // if(o.origin === 'paste' && o.text.length > 1){
        //   if(o.text[0] && o.text[1] !== ''){
        //     socket.emit("editorChanged", emitObj);

        //   }
        // }
    }

    const handlePreview = e => {
        const previewFrame = document.getElementById('preview_iframe')
        // var preview =  previewFrame.contentDocument || previewFrame.contentWindow.document;
        let styles, html, script

        styles = codemarkastate.previewContent.css.content
        html = codemarkastate.previewContent.html.content
        script = codemarkastate.previewContent.js.content

        const getGeneratedPageURL = ({ html, css, js }) => {
            const getBlobURL = (code, type) => {
                const blob = new Blob([code], { type })
                return URL.createObjectURL(blob)
            }

            const cssURL = getBlobURL(css, 'text/css')
            const jsURL = getBlobURL(js, 'text/javascript')

            const source = `
    <html>
      <head>
<html lang="en">
      
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${ css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${ js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${ html || ''}
      </body>
    </html>
  `

            return getBlobURL(source, 'text/html')
        }

        const url = getGeneratedPageURL({
            html,
            css: styles,
            js: script
        })

        if (styles && html && script) {
            previewFrame.src = url
        }
    }

    let classNotification

    const handletoogleUserEditAccess = (e, u) => {
        socket.emit('toogle_class_role', { user: u, new_role: e.target.value })
    }

    const addClassToFavourite = e => {
        e.preventDefault()
        socket.emit('add_to_favourite')
    }

    const handlePrivateMessaging = (e, user) => {
        toast.info('Feature not available for free classrooms')
    }

    const handleUserBlocking = (e, user) => {
        socket.emit('block_user', user)
    }

    const handlewaveAtUser = (e, user) => {
        toast.info(`Hey! You just waved at ${user.username}`)
        socket.emit('user_waving', user)
    }

    const handleClassroomInformationInputChange = (e, inputname) => {
        const v = e.target.value

        setClassroomInformation(input => {
            return { ...input, [inputname]: { value: v } }
        })
    }

    const handlePinTextAreaChange = e => {
        e.preventDefault()
        const v = e.target.value

        setClassroomPinnedInformation(c => {
            return { ...c, touched: true, value: v }
        })
    }

    const handleClassPinnnedSubmit = e => {
        e.preventDefault()

        if (owner && ClassroomPinnedInformation.value.trim() !== '') {
            setcodemarkaState(c => {
                return { ...c, submitted: true }
            })
            setClassroomPinnedInformation(c => {
                return { ...c, touched: false, value: '' }
            })
            socket.emit('new_pinned_message', ClassroomPinnedInformation.value)
        } else {
            alert('No permission to perform Operation!');
        }
    }

    const handleUserInviteSubmit = e => {
        e.preventDefault();
        if (owner && userInvitationData.value.trim() !== '') {
            setcodemarkaState(c => {
                return { ...c, submitted: true }
            })
            setUserInvitationData(c => {
                return { ...c, socketFeedback: null, socketFeedbackStatus: null }
            });

            socket.emit('invite_user', {
                user: userInvitationData.value,
                classData: {
                    ownerid,
                    data,
                    owner,
                    name,
                    description,
                    username,
                    topic,
                    started,
                    kid,
                    cd
                }
            })
        } else {
            alert('No permission to perform Operation or check input!');
        }
    }

    const addPinTextArea = (
        <form onSubmit={handleClassPinnnedSubmit}>
            <Input
                name="text__area__msg__pin"
                elementType="textarea"
                elementConfig={{
                    disabled: owner ? false : true,
                    placeholder: 'Pin Message Here...',
                    name: 'text__area__msg__pin'
                }}
                value={ClassroomPinnedInformation.value}
                inputType="textarea"
                changed={handlePinTextAreaChange}
            />
            <button
                type="submit"
                onClick={handleClassPinnnedSubmit}
                className="btn btn-sm float-left btn-soft-success">
                {codemarkastate.submitted ? <Spinner /> : 'Add'}
            </button>
        </form>
    )

    const handleClassInfoUpdate = e => {
        e.preventDefault()

        setClassroomInformation(input => {
            return { ...input, submitted: true }
        })
        if (owner) {
            socket.emit('classInformationUpdate', ClassroomInformation)
        } else {
            toast.error('No Access to perfom this action')
        }
    }
    const classfilesdownloadlink = `${CLASSROOM_FILE_DOWNLOAD}${data.classroom_id}`

    const getPinnedMessages = () => {
        const pm = codemarkastate.pinnedMessages.map(msg => {
            if (msg.content.trim() !== '')
                return (
                    <div
                        key={msg.id}
                        className="card mt-0 mb-1"
                        style={{
                            borderLeft: '2px solid #E91E63',
                            borderRadius: 0
                        }}>
                        <div
                            className="card-body"
                            style={{ padding: 10, fontWeight: 'bolder' }}>
                            <p className="mb-0">{msg.content}</p>
                        </div>
                    </div>
                )
            else return ''
        })

        if (pm && Array.isArray(pm) && pm.length > 0) {
            return pm
        } else {
            return 'No Pinned Items!'
        }
    }

    const handletestConnection = e => {
        e.preventDefault()
        if (socket.connected) {
            toast.success(
                <div>
                    <b>Heads Up!!</b> <br />
                    You are Connected.
                </div>
            )
        } else {
            toast.error(
                <div>
                    <b>Heads Up!!</b> <br />
                    You are disconnected!!
                </div>
            )
        }
    }

    const handleexitClassGracefully = e => {
        e.preventDefault()
        if (codemarkastate.starRated) {
            window.location.href = window.location.origin
        } else {
            document
                .getElementById('exit_grancefully__success_dropdown_1')
                .click()
        }
    }

    const handleclassReport = e => {
        e.preventDefault()
    }

    const handleClassStar = e => {
        const element = document.getElementById(e.target.id)
        const starPos = parseInt(element.id)
        let strId = ''
        let i = 1

        while (i <= starPos) {
            strId = i.toString()
            const gold = document.getElementById(strId)
            gold.style.color = 'gold'
            i++
        }

        while (i <= 5) {
            strId = i.toString()
            const white = document.getElementById(strId)
            white.style.color = 'grey'
            i++
        }

        const countYellowStars = () => {
            const arr = []
            const stars = document.querySelectorAll('.fa__codemarka__star')
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].style.color === 'gold') {
                    arr.push(stars[i].style.color)
                }
            }
            const rating = arr.length
            setStarRating(r => {
                return rating
            })
        }

        countYellowStars()
    }

    const handleClassStarRating = e => {
        e.preventDefault()
        socket.emit('star_rating', starRating)
    }

    const addStars = (
        <div className="mt-3 text-center">
            <div className="border border-dark p-3 m-3 mb-4">
                <h3 className="font-weight-900">How was this class session?</h3>
            </div>

            <div>
                <span
                    onClick={handleClassStar}
                    id="1"
                    className="fa fa-star fa__codemarka__star fa-2x border-success"></span>
                <span
                    onClick={handleClassStar}
                    id="2"
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
                <span
                    onClick={handleClassStar}
                    id="3"
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
                <span
                    onClick={handleClassStar}
                    id="4"
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
                <span
                    id="5"
                    onClick={handleClassStar}
                    className="fa fa-star fa-2x fa__codemarka__star border-success"></span>
            </div>

            <div className="text-center mt-3">
                <div>
                    <button
                        type="button"
                        onClick={e => redirectTo(e, '/')}
                        className="btn btn-animated  btn-sm btn-outline-success btn-animated-y">
                        <span className="btn-inner--visible">NOT NOW</span>
                        <span className="btn-inner--hidden">
                            <i className="fa fa-pause-circle"></i>
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={handleClassStarRating}
                        className="btn btn-animated  btn-sm btn-outline-success btn-animated-x">
                        <span className="btn-inner--visible">SUBMIT</span>
                        <span className="btn-inner--hidden">
                            <i className="fa fa-thumbs-up"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )

    if (codemarkastate.redirect) {
        return <Redirect to={codemarkastate.redirect} />
    }

    const handleEndClass = e => {
        e.preventDefault();
        document.querySelector('#exitbtn').click()
    }

    const handleuserInvitationDataChange = e => {
        e.preventDefault();
        e.persist();
        const v = e.target.value;
        setUserInvitationData(c => {
            return { value: v, socketFeedback: null, socketFeedbackStatus: null }
        });
    }

    const HandleClassShutdown = e => {
        e.preventDefault()
        if (owner) {
            socket.emit('shutdown_classroom')
        }
    }

    const handlestartClass = e => {
        e.preventDefault()
        if (owner) {
            socket.emit('start_class', userid)
            setcodemarkaState(s => {
                return { ...s, starting: true }
            })
        }
    }
    const handleAddUserIconClicked = e => {
        document.querySelector('#participantModalExitButton').click()
        document.querySelector('#add_user_modal_btn').click();

    }

    const handledropDownSelect = (event, value, editor) => {
        // console.log(event,value,editor);
    }

    // const handleAuidoBroadCastAlert = (message) => {
    //     toast.info(<div>Heads Up!! <br/> {message} </div>)
    // }

    return (
        <div>
            <Seo
                title={`${name} :: codemarka classroom`}
                metaDescription={description}>
                <script src="https://unpkg.com/jshint@2.9.6/dist/jshint.js"></script>
                <script src="https://unpkg.com/jsonlint@1.6.3/web/jsonlint.js"></script>
                <script src="https://unpkg.com/csslint@1.0.5/dist/csslint.js"></script>
            </Seo>
            <ToastContainer />
            <Preview
                previewBtnClicked={handlePreview}
                classroomid={data.classroom_id}
            />
            {classNotification}
            <span
                className="d-none"
                id="exit_grancefully__success_dropdown_1"
                role="button"
                data-toggle="modal"
                data-target="#exit_class_modal_cont">
                ;
            </span>

            <Navigation
                name={name}
                downloadLink={classfilesdownloadlink}
                favourite={addClassToFavourite}
                isFavourite={codemarkastate.favourite}
                topic={topic}
                exitClassGracefully={handleexitClassGracefully}
                classroomid={data.classroom_id}
                testConnection={handletestConnection}
                classReport={handleclassReport}
                number={codemarkastate.numberInClass}
                owner={owner}
                endClass={handleEndClass}
                startClass={handlestartClass}
            />

            <button
                id="dialogueToStart"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#startclassModal"></button>
            <div
                className="modal modal-white fade"
                id="startclassModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="startclassModal"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                {codemarkastate.started === null ? (
                                    <div>
                                        {codemarkastate.starting === true ? (
                                            <div>
                                                <h5 className="heading h4 mt-4">
                                                    Starting...
                                                </h5>
                                                <Spinner />
                                            </div>
                                        ) : (
                                                <div>
                                                    <h5 className="heading h4 mt-4">
                                                        Hi there!
                                                </h5>
                                                    <p>
                                                        Your classroom session is
                                                        yet to begin, click on start
                                                        now and open the doors. You
                                                        can still start this
                                                        classroom later by clicking
                                                        the settings icon and locate
                                                        the actions button.
                                                </p>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-success"
                                                            onClick={
                                                                handlestartClass
                                                            }>
                                                            Start Now
                                                    </button>
                                                        <button
                                                            type="button "
                                                            className="btn btn-sm btn-white"
                                                            data-dismiss="modal">
                                                            Later
                                                    </button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                ) : (
                                        <div>
                                            <h5 className="heading h4 mt-4">
                                                You are all set!
                                        </h5>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                id="shutdownemitionbtn"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#shutdownSignalModal">
                shutting down..
            </button>
            <div
                className="modal modal-info fade"
                id="shutdownSignalModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="shutdownSignalModal"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <b className="fas fa-4x">
                                    {codemarkastate.ended ? (
                                        <h1>The End!</h1>
                                    ) : (
                                            codemarkastate.countDownTime
                                        )}
                                </b>
                                {!codemarkastate.ended ? (
                                    <div>
                                        <h5 className="heading h4 mt-4">
                                            Shutting down classroom!
                                        </h5>
                                        <p>
                                            We recieved a signal to end this
                                            session, if this should not be,
                                            please contect the admin. Meanwhile
                                            you can still download files for
                                            this classroom before you exit.
                                        </p>
                                    </div>
                                ) : (
                                        ''
                                    )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a
                                className="btn btn-sm btn-primary"
                                href={classfilesdownloadlink}>
                                Download Files
                            </a>
                            <a className="btn btn-sm btn-white" href="/?#">
                                Leave now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <button
                id="exitbtn"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#exitClass">
                Exit
            </button>
            <div
                className={'modal modal-danger fade'}
                id="exitClass"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exitClass"
                aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h6" id="modal_title_6">
                                This is way too dangerous
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {codemarkastate.sdemitted &&
                                !codemarkastate.ended ? (
                                    <div className="text-center">
                                        Processing,please wait...
                                        <br /> <Spinner />{' '}
                                    </div>
                                ) : (
                                    <div className="py-3 text-center">
                                        <i className="fas fa-exclamation-circle fa-4x"></i>
                                        {codemarkastate.ended ? (
                                            <h2 className="heading h1">Done!</h2>
                                        ) : (
                                                <div>
                                                    <h5 className="heading h4 mt-4">
                                                        Should we stop now?
                                            </h5>
                                                    <p>
                                                        Once you end this classroom,
                                                        it's no longer visible to anyone
                                                        and request to join would fail,
                                                        but can be restored from your
                                                        dashboard.
                                            </p>
                                                </div>
                                            )}
                                    </div>
                                )}
                        </div>
                        {!codemarkastate.sdemitted ? (
                            <div className="modal-footer">
                                <button
                                    type="button "
                                    className="btn btn-sm btn-white"
                                    data-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-white"
                                    onClick={HandleClassShutdown}>
                                    End now
                                </button>
                            </div>
                        ) : (
                                ''
                            )}
                    </div>
                </div>
            </div>

            <Modal
                targetid="exit_class_modal_cont"
                type="default"
                size="sm"
                titleIcon={<i className="fa fa-thumbs-up"></i>}
                title={' Rate this classroom '}>
                {addStars}
            </Modal>

            <Modal
                targetid="pinned_modal_cont"
                type="default"
                size="sm"
                titleIcon={<i className="fa fa-pen-nib"></i>}
                title={'Pinned Messages'}>
                {getPinnedMessages()}
                {owner ? addPinTextArea : ''}
            </Modal>
            <button
                id="add_user_modal_btn"
                type="button"
                className="btn btn-danger d-none"
                data-toggle="modal"
                data-target="#add_user_modal"
            ></button>

            <Modal
                targetid="add_user_modal"
                type="default"
                size="sm"
                titleIcon={<i className="fa fa-users"></i>}
                title={'Invite people'}>
                <form>
                    <Input
                        name="add_user_input"
                        elementType="input"
                        elementConfig={{
                            disabled: owner ? false : true,
                            placeholder: 'Invite with email or username',
                            name: 'add_user_input'
                        }}
                        value={userInvitationData.value}
                        inputType="input"
                        changed={handleuserInvitationDataChange}
                    />
                    <button
                        type="submit"
                        onClick={handleUserInviteSubmit}
                        disabled={codemarkastate.submitted}
                        className="btn btn-sm float-right btn-success">
                        {codemarkastate.submitted ? (
                            <Spinner />
                        ) : (
                                <div>
                                    Send Invite <i className="fa fa-forward"></i>
                                </div>
                            )}
                    </button>
                    <div>
                        {userInvitationData.socketFeedback !== null ? (<span className={`${userInvitationData.socketFeedbackStatus ? 'text-success' : 'text-danger'}`}> {userInvitationData.socketFeedback} </span>) : ''}
                    </div>
                </form>
            </Modal>
            <Modal
                targetid="details_modal_cont"
                type="default"
                size="sm"
                buttonExtra={
                    owner ?
                        (
                            <button
                                type="submit"
                                onClick={handleClassInfoUpdate}
                                className="btn btn-sm float-left btn-soft-primary">
                                {
                                    ClassroomInformation.submitted ?
                                        (<Spinner />) : ('Save')
                                }
                            </button>
                        ) :
                        (
                            false
                        )
                }
                title="classroom Information">
                <form onSubmit={handleClassInfoUpdate}>
                    <Input
                        name="cname"
                        label="Classroom Name"
                        elementType="input"
                        elementConfig={{
                            disabled: owner ? false : true,
                            placeholder: 'Classroom Name',
                            name: 'cname'
                        }}
                        value={ClassroomInformation.cname.value}
                        changed={e =>
                            handleClassroomInformationInputChange(e, 'cname')
                        }
                    />
                    <Input
                        name="ctopic"
                        label="Classroom Topic"
                        elementType="input"
                        elementConfig={{
                            disabled: owner ? false : true,
                            placeholder: 'Classroom Name',
                            name: 'ctopic'
                        }}
                        value={ClassroomInformation.ctopic.value}
                        changed={e =>
                            handleClassroomInformationInputChange(e, 'ctopic')
                        }
                    />
                    <Input
                        label="Classroom Description"
                        elementType="textarea"
                        elementConfig={{
                            disabled: owner ? false : true,
                            placeholder: 'Classroom Name',
                            name: 'cdesc'
                        }}
                        value={ClassroomInformation.cdesc.value}
                        changed={e =>
                            handleClassroomInformationInputChange(e, 'cdesc')
                        }
                    />
                </form>
            </Modal>


            <ParticipantModal
                users={codemarkastate.users}
                toogleUserEditAccess={handletoogleUserEditAccess}
                owner={owner}
                ownerid={ownerid}
                userid={userid}
                sendUserPrivateMessage={handlePrivateMessaging}
                blockUser={handleUserBlocking}
                waveAtUser={handlewaveAtUser}
                handleAddUserIconClicked={handleAddUserIconClicked}
            />

            <div style={{ width: '100%', height: '87vh' }}>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-2 p-0">
                            <Suspense fallback={<Spinner />}>
                                <Convo
                                    typing={codemarkastate.typingState}
                                    username={username}
                                    inputValue={inputState.value}
                                    handleInputChange={handleInputChange}
                                    sendMessage={handleMessageSubmit}
                                    focused={inputState.isFocused}
                                    messages={codemarkastate.messages}
                                    userSpecificMessages={userSpecificMessages}
                                    user={userid}
                                    owner={ownerid}
                                    collectEmoji={collectEmoji}
                                />
                            </Suspense>
                        </div>
                        <div className="col-10 p-0">
                            <Suspense fallback={<Spinner />}>
                                <Editor
                                    readOnly={codemarkastate.editorPriviledge}
                                    handleEditorChange={editorChanged}
                                    files={codemarkastate.editors}
                                    dropDownSelect={handledropDownSelect}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onClassroomVerify: classroomid =>
            dispatch(action.classVerify(classroomid))
    }
}
export default connect(null, mapDispatchToProps)(MainClassLayout)
