/** @format */

import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import './index.css'

export default function AudioVideoBroadcast(props) {
    const socketRef = useRef()
    const localVideo = useRef()
    const localStream = useRef()
    const hostVideo = useRef()
    const PeerId = useRef()
    const peersRef = useRef([])
    const peerConnections = useRef({})
    const peerRef = useRef()
    const [, setPeers] = useState([])
    const usersRef = useRef()
    const isHost = useRef()
    const onCall = useRef(false)
    const hostVideoStatus = useRef(false)
    const hostAudioStatus = useRef(false)
    const [isBroadCasting, setIsBroadCasting] = useState(false)

    useEffect(() => {
        usersRef.current = props.users
    }, [props.users])

    useEffect(() => {
        socketRef.current = props.socket
        isHost.current = props.isOwner

        const peer = new Peer(props.userkid, {
            host: 'peerjs-server.herokuapp.com',
            port: 443,
            // debug: 3,
            key: 'peerjs',
            secure: true,
            config: {
                iceServers: [
                    { url: 'stun:stun1.l.google.com:19302' },
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com',
                    },
                ],
            },
        })
        peerRef.current = peer

        peerRef.current.on('open', function (id) {
            PeerId.current = id
            if (props.isBroadcasting && props.isOwner) {
                navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .then((mediaStream) => {
                        hostVideo.current.srcObject = mediaStream
                        localStream.current = mediaStream
                        setIsBroadCasting((br) => true)
                        hostVideoStatus.current = true
                        hostAudioStatus.current = true
                        usersRef.current
                            // .filter((user) => user.kid !== props.userkid)
                            .forEach((user) => {
                                console.log('calling user ', user)
                                const conn = peerRef.current.connect(user.kid)
                                if (conn) {
                                    conn.on('open', () => {
                                        console.log(
                                            'connection opened for user ',
                                            user
                                        )
                                        callUser(user)
                                    })

                                    conn.on('close', () => {
                                        delete peerConnections.current[user.kid]
                                    })
                                }
                            })
                    })
            }
        })
    }, [])

    useEffect(() => {
        socketRef.current.on('call_me', (user) => {
            console.log('should call', user)
            if (isHost.current) {
                navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .then((mediaStream) => {
                        setIsBroadCasting(true)
                        hostVideoStatus.current = true
                        hostAudioStatus.current = true
                        hostVideo.current.srcObject = mediaStream
                        localStream.current = mediaStream
                        callUser(user)
                    })
            }
        })
        socketRef.current.on('broadcast_status', (status, id) => {
            if (status) {
                // call users

                if (id === socketRef.current.id)
                    // socketRef.current.emit('start_broadcast', roomID)
                    setIsBroadCasting((br) => true)
                if (isHost.current) {
                    navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: true,
                        })
                        .then((mediaStream) => {
                            hostVideo.current.srcObject = mediaStream
                            localStream.current = mediaStream
                            hostVideoStatus.current = true
                            hostAudioStatus.current = true
                            usersRef.current
                                .filter((user) => user.kid !== props.userkid)
                                .forEach((user) => {
                                    console.log('calling user ', user)
                                    const conn = peerRef.current.connect(
                                        user.kid
                                    )
                                    if (conn) {
                                        conn.on('open', () => {
                                            console.log(
                                                'connection opened for user ',
                                                user
                                            )
                                            callUser(user)
                                        })
                                    }
                                })
                        })
                }
            } else {
                props.onAlert('Failed to start broadcast,try again')
                setIsBroadCasting((br) => false)
                setPeers([])
                peersRef.current = []
            }
        })

        socketRef.current.on('broadcast_end_confirmed', (status) => {
            if (status) {
                setIsBroadCasting((br) => false)

                if (isHost.current) {
                    peerConnections.current = {}
                    const node = document.getElementById(
                        'remote-streams-container'
                    )
                    while (node.firstChild) {
                        node.removeChild(node.lastChild)
                    }
                } else {
                    localVideo.current.srcObject = null
                    localStream.current = null
                }
                hostVideo.current.srcObject = null
                localStream.current.getTracks().forEach(function (track) {
                    track.stop()
                })
                setPeers([])
                peersRef.current = []
                props.onAlert('Host has ended live broadcast.')
            }
        })

        socketRef.current.on('operation_failed', (reason) => {
            props.onAlert(reason)
            setIsBroadCasting((br) => false)
        })

        peerRef.current.on('connection', function (conn) {
            // console.log('received connection from', conn)
            conn.on('open', function () {
                // console.log('connection opened')
            })
        })

        peerRef.current.on('call', function (call) {
            // Answer the call, providing our mediaStream
            if (!onCall.current) {
                navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .then((mediaStream) => {
                        localVideo.current.srcObject = mediaStream
                        localStream.current = mediaStream

                        call.answer(mediaStream)

                        call.on('stream', (remoteStream) => {
                            // console.log('received host stream')

                            hostVideo.current.srcObject = remoteStream
                            onCall.current = true
                            setIsBroadCasting((br) => true)
                        })
                    })
            } else {
                console.log('Already on call')
            }
        })

        peerRef.current.on('close', function () {
            peerRef.current.destroy()
            onCall.current = false
        })

        peerRef.current.on('disconnected', function () {
            onCall.current = false
            peerRef.current.reconnect()
        })

        peerRef.current.on('error', function (e) {
            const FATAL_ERRORS = [
                'invalid-id',
                'invalid-key',
                'network',
                'ssl-unavailable',
                'server-error',
                'socket-error',
                'socket-closed',
                'unavailable-id',
                'webrtc',
            ]
            if (FATAL_ERRORS.includes(e.type)) {
                if (isHost.current) {
                    navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: true,
                        })
                        .then((mediaStream) => {
                            hostVideo.current.srcObject = mediaStream
                            localStream.current = mediaStream
                            hostVideoStatus.current = true
                            hostAudioStatus.current = true
                            usersRef.current
                                .filter((user) => user.kid !== props.userkid)
                                .forEach((user) => {
                                    console.log('calling user ', user)
                                    const conn = peerRef.current.connect(
                                        user.kid
                                    )
                                    if (conn) {
                                        conn.on('open', () => {
                                            console.log(
                                                'connection opened for user ',
                                                user
                                            )
                                            callUser(user)
                                        })
                                    }
                                })
                        })
                }
            } else {
                console.log('Non fatal error: ', e.type)
            }
        })
    }, [])

    const handleBroadcasting = () => {
        if (!isBroadCasting) {
            // startBroadcast
            socketRef.current.emit('broadcast_init', true, props.userkid)
        } else {
            // stopBroadcast();
            socketRef.current.emit('broadcast_end', true, props.userkid)
        }
    }

    const switchHostVideo = (e) => {
        localStream.current.getTracks().forEach(function (track) {
            //  track.stop()
            if (track.kind == 'video') {
                if (hostVideo.current) {
                    track.stop()
                    hostVideoStatus.current = false
                } else {
                    navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: true,
                        })
                        .then((mediaStream) => {
                            mediaStream.getVideoTracks().then((track) => {
                                console.log(track)
                            })
                        })
                }
            }
            console.log(track)
            //  console.log(track)
        })
    }

    function callUser(user) {
        delete peerConnections.current[user.kid]

        const conn = peerRef.current.connect(user.kid, { reliable: true })
        if (conn) {
            conn.on('open', () => {
                // console.log('connection opened for user ', user)

                peerConnections.current[user.kid] = {
                    metadata: user,
                }
                const call = peerRef.current.call(user.kid, localStream.current)

                call.on('stream', function (stream) {
                    console.log('User has amswered')

                    peerConnections.current[user.kid] = {
                        ...peerConnections.current[user.kid],
                        stream,
                    }
                    setIsBroadCasting((br) => true)
                    // setPeers((p) => {
                    //     return [...p, { ...peerConnections.current[user.kid] }]
                    // })
                    if (document.querySelector(`div#${user.kid}`)) {
                        document.querySelector(`div#${user.kid}`).remove()
                    }
                    var videoDivContainer = document.createElement('div')
                    videoDivContainer.classList.add(
                        'remote-participant-video-container'
                    )
                    videoDivContainer.id = user.kid
                    var videoLabel = document.createElement('div')
                    videoLabel.classList.add('video-label')
                    videoLabel.innerText = `@${user.username}`
                    var videlem = document.createElement('video')
                    videlem.srcObject = stream
                    videlem.autoplay = true
                    videlem.id = user.kid
                    videlem.playsInline = true
                    videoDivContainer.appendChild(videlem)
                    videoDivContainer.appendChild(videoLabel)
                    document
                        .getElementById('remote-streams-container')
                        .appendChild(videoDivContainer)
                })
                call.on('error', (e) => {
                    console.warn('error with stream', e)
                    if (isHost.current) {
                        callUser(user)
                    }
                })

                call.on('close', function () {
                    delete peerConnections.current[user.kid]
                    document.querySelector(`div#${user.kid}`).remove()
                })
            })
        }
    }
    return (
        <div className="h-100" style={{ backgroundColor: '#0f0f0f' }}>
            {/* <button
                    type="button"
                    className={`audio_switch_button`}>
                    <i className="fa fa-microphone fa-2x"></i>
                </button> */}
            <div className="participant-host-video-container">
                <span className="hide">
                    <i className="fa fa-video mr-2"></i> Video chat
                </span>

                <div className="video-container">
                    <div className="host-video-container">
                        <video
                            ref={hostVideo}
                            muted={isHost.current ? true : false}
                            className="host-video"
                            autoPlay
                            playsInline></video>
                        <div className="video-label">
                            {isHost.current ? 'You' : 'Host'}
                        </div>

                        <div className="mediaControls">
                            <span>
                                <i className="fa fa-microphone-alt"></i>
                                <i
                                    className="fas fa-video"
                                    onClick={switchHostVideo}></i>
                            </span>
                        </div>
                    </div>
                    {!isHost.current ? (
                        <div className="local-video-container">
                            <video
                                ref={localVideo}
                                muted
                                className="local-video"
                                autoPlay
                                playsInline></video>
                            <div className="video-label">You</div>
                        </div>
                    ) : (
                        <div id="remote-streams-container"></div>
                    )}
                </div>
            </div>
            {isHost.current ? (
                <div className="video-chat-actions-container">
                    <button
                        type="button"
                        onClick={handleBroadcasting}
                        className={`btn w-100 btn-sm btn-outline-${
                            isBroadCasting === true ? 'success' : 'info'
                        }`}>
                        {isBroadCasting ? 'Hang Up' : 'Call In '}
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
