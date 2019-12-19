/**
 * /* eslint-disable no-undef
 *
 * @format
 */

import React, { useState } from 'react'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navigation from '../../components/classroom/UI/NavBar'
import Convo from './Conversation'
import Editor from '../../components/classroom/Editor/Editor'
import Preview from '../../components/classroom/Editor/Preview'
import Seo from '../../components/SEO/helmet'

import ParticipantModal from '../../components/classroom/Participants/Modal'

import { CLASSROOM_FILE_DOWNLOAD } from '../../config/api_url'
import './css/Environment.css'

const host =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? process.env.REACT_APP_REMOTE_API_URL
        : process.env.REACT_APP_LOCAL_API_URL

const socket = io(`${ host }classrooms`, {
    reconnection: true,
    reconnectionDelay: 6000,
    reconnectionDelayMax: 6000,
    reconnectionAttempts: 9
})
toast.configure({
    autoClose: 6000,
    draggable: true
})

const MainClassLayout = ({
    ownerid,
    data,
    owner,
    name,
    description,
    username,
    userid,
    topic
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
        favourite: null
    })

    const [inRoom, setInRoom] = useState(false)

    React.useEffect(() => {
        const requestData = {
            classroom_id: data.classroom_id,
            userId: userid,
            username
        }

        if (inRoom !== true && inRoom !== null) {
            // set listeners and emitters

            //listen for old message
            socket.on('updateMsg', msg => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages
                    msg.msgs.forEach(element => {
                        oldmsg.push(element)
                    })
                    return { ...c, messages: oldmsg }
                })
            })

            // tell server to add user to class
            socket.emit('join', requestData)
            setInRoom(true)
            //listen for new members added
            socket.on('someoneJoined', msg => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages

                    oldmsg.push(msg)

                    return { ...c, messages: oldmsg, users: msg.newuserslist }
                })
                if (codemarkastate.messages) {
                    const len = codemarkastate.messages.length
                    const lastIndex = len - 1
                    const ele = codemarkastate.messages[lastIndex].msgId
                    const lelem = document.getElementById(ele)

                    lelem.scrollIntoView(false)
                }
            })

            socket.on('disconnect', reason => {
                                socket.emit('leave', requestData)

                if (reason === 'io server disconnect') {
                    // the disconnection was initiated by the server, you need to reconnect manually
                    socket.connect()
                }

                toast.warn('Disconnected from classroom', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })

            socket.on('reconnecting', attemptNumber => {
                toast.info('Attempting to reconnect to classroom,please wait...')
            })

            socket.on('reconnect_error', error => {
                toast.warn('Reconnection failed, try refreshing this window')
            })

            socket.on('reconnect', attemptNumber => {
                socket.emit('join', requestData)
                toast.success('Welcome back online!')
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

                if (codemarkastate.messages) {
                    const len = codemarkastate.messages.length
                    const lastIndex = len - 1

                    const ele = codemarkastate.messages[lastIndex].msgId
                    const lelem = document.getElementById(ele)

                    lelem.scrollIntoView(false)
                }
            })

            //listen for members leaving
            socket.on('updatechat_left', msg => {
                setcodemarkaState(c => {
                    const oldmsg = c.messages
                    oldmsg.push(msg)

                    const newUserList = c.users.filter(user => {
                        return String(user.id) !== String(msg.for)
                    });
                    return { ...c, messages: oldmsg,users: newUserList }
                })
                if (codemarkastate.messages) {
                    const len = codemarkastate.messages.length
                    const lastIndex = len - 1

                    const ele = codemarkastate.messages[lastIndex].msgId
                    const lelem = document.getElementById(ele)

                    lelem.scrollIntoView(false)
                }
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
                        console.log('found', username)
                        // user has typed and was recorded, don't do anything
                        return c
                    } else {
                        console.log('not found', username)
                        const oldT = c.typingState
                        oldT.push({ username, id: userid })
                        return { ...c, typingState: oldT }
                    }
                })
            })

            socket.on('utyping_cleared', ({ username, userid }) => {
                console.log(username, 'cleared input')
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
                    return { ...c, users: data }
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
                        const oldUsers = c.users
                        const newUserRole = oldUsers.map(user => {
                            if (String(user.id) === String(__d.id)) {
                                return {
                                    id: String(user.id),
                                    role: __d.role,
                                    username: user.username
                                }
                            } else {
                                return user
                            }
                        })
                        return {
                            ...c,
                            users: newUserRole,
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

            socket.on('user_waved', ({ from, to }) => {
                if (userid === to.id) {
                    toast.info(`${ from } waved at you`)
                }
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
                ({ id, file, content, editedBy }) => {
                    setcodemarkaState(c => {
                        // check preview states
                        if (editedBy !== userid) {
                            let oldFiles
                            c.editors.forEach((element, i) => {
                                if (
                                    element.file === file &&
                                    element.id === id
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
                                    [file]: { content, id }
                                }
                            }
                        } else {
                            return { ...c }
                        }
                    })
                }
            )
        }

        return () => {
            if (inRoom) {
                socket.emit('leave', requestData)
                setInRoom(false)
            }
        }
    }, [
        codemarkastate.owner,
        codemarkastate.messages,
        username,
        data.classroom_id,
        userid,
        inRoom,
        codemarkastate.username,
        codemarkastate.classroom_id,
        owner
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

    const handleMessageSubmit = e => {
        e.preventDefault()

        if (inputState.value !== '') {
            setInputState({
                ...inputState,
                lastSentMessage: e.target.value,
                value: ''
            })

            const msg_data = {
                user: userid,
                class: data.classroom_id,
                message: inputState.value
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
            editedBy: userid
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

        console.log(e);

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
        ${ css && `<link rel="stylesheet" type="text/css" href="${ cssURL }" />` }
        ${ js && `<script src="${ jsURL }"></script>` }
      </head>
      <body>
        ${ html || '' }
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
    if (!owner && !codemarkastate.editorPriviledge) {
        classNotification = (
            <div
                class="alert alert-group alert-info alert-icon fixed-bottom w-25 left-10"
                role="alert">
                <div class="alert-group-prepend">
                    <span class="alert-group-icon text-white">
                        <i className="fa fa-info-circle"></i>
                    </span>
                </div>
                <div class="alert-content">
                    <strong>Heads up!</strong> You cannot format the editors.
                </div>
                <div class="alert-action">
                    <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )
    }

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
        toast.info(`Hey! You just waved at ${ user.username }`)
        console.log(user)
        socket.emit('user_waving', user)
    }

    const classfilesdownloadlink = `${ host }${ CLASSROOM_FILE_DOWNLOAD }${ data.classroom_id }`

    return (
        <div>
            <ToastContainer />

            <Preview
                previewBtnClicked={ handlePreview }
                classroomid={ data.classroom_id }
            />
            {classNotification}

            <Navigation
                name={ name }
                downloadLink={ classfilesdownloadlink }
                favourite={ addClassToFavourite }
                isFavourite={ codemarkastate.favourite }
                topic = { topic }
            />

            <ParticipantModal
                users={ codemarkastate.users }
                toogleUserEditAccess={ handletoogleUserEditAccess }
                owner={ owner }
                ownerid={ ownerid }
                userid={ userid }
                sendUserPrivateMessage={ handlePrivateMessaging }
                blockUser={ handleUserBlocking }
                waveAtUser={ handlewaveAtUser }
            />

            <div style={ { width: '100%', height: '87vh' } }>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-2 p-0">
                            <Seo
                                title={ `${ name } :: codemarka classroom` }
                                description={ description }
                            />
                            <Convo
                                typing={ codemarkastate.typingState }
                                username={ username }
                                inputValue={ inputState.value }
                                handleInputChange={ handleInputChange }
                                sendMessage={ handleMessageSubmit }
                                focused={ inputState.isFocused }
                                messages={ codemarkastate.messages }
                                user={ userid }
                                owner={ ownerid }
                            />
                        </div>
                        <div className="col-10 p-0">
                            <Editor
                                readOnly={ codemarkastate.editorPriviledge }
                                handleEditorChange={ editorChanged }
                                files={ codemarkastate.editors }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainClassLayout
