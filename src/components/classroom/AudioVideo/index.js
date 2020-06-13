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
    const roomID = props.kid
    const peersRef = useRef([])
    const peerConnections = useRef({})

    const [peers, setPeers] = useState([])

    const usersRef = useRef()
    const isHost = useRef()
    const [isBroadCasting, setIsBroadCasting] = useState(false)

    useEffect(() => {
        usersRef.current = props.users
    }, [props.users])

    useEffect(() => {
        socketRef.current = props.socket
        isHost.current = props.isOwner

        const peer = new Peer(props.userkid, {
            host: 'localhost',
            port: 2001,
            path: '/peerjs',
            debug: 3,
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

        socketRef.current.on('broadcast_status', (status, id) => {
            if (status) {
                // call users

                if (id === socketRef.current.id)
                    socketRef.current.emit('start_broadcast', roomID)
                setIsBroadCasting((br) => true)
                if (isHost.current) {
                    navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: false,
                        })
                        .then((mediaStream) => {
                            hostVideo.current.srcObject = mediaStream
                            localStream.current = mediaStream

                            usersRef.current
                                .filter((user) => user.kid !== props.userkid)
                                .forEach((user) => {
                                    console.log('calling user ', user)
                                    const conn = peer.connect(user.kid)

                                    conn.on('open', () => {
                                        console.log(
                                            'connection opened for user ',
                                            user
                                        )

                                        peerConnections.current[user.id] = {
                                            metadata: user,
                                        }

                                        const call = peer.call(
                                            user.kid,
                                            mediaStream
                                        )

                                        call.on('stream', function (stream) {
                                            console.log('got remote stream')
                                            peerConnections.current[user.id] = {
                                                ...peerConnections.current[
                                                    user.id
                                                ],
                                                stream,
                                            }
                                            var videoDivContainer = document.createElement(
                                                'div'
                                            )
                                            videoDivContainer.classList.add(
                                                'remote-participant-video-container'
                                            )
                                            videoDivContainer.id = user.id
                                            var videoLabel = document.createElement(
                                                'div'
                                            )
                                            videoLabel.classList.add(
                                                'video-label'
                                            )
                                            videoLabel.innerText = user.username
                                            var videlem = document.createElement(
                                                'video'
                                            )
                                            videlem.srcObject = stream
                                            videlem.autoplay = true
                                            videlem.playsInline = true
                                            videoDivContainer.appendChild(
                                                videlem
                                            )
                                            videoDivContainer.appendChild(
                                                videoLabel
                                            )
                                            document
                                                .getElementById(
                                                    'remote-streams-container'
                                                )
                                                .appendChild(videoDivContainer)
                                        })
                                    })
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

                setPeers([])
                peersRef.current = []
                props.onAlert('Host has ended live broadcast.')
            }
        })

        socketRef.current.on('operation_failed', (reason) => {
            props.onAlert(reason)
            setIsBroadCasting((br) => false)
        })

        peer.on('open', function (id) {
            PeerId.current = id
            console.log('my peer id is', PeerId.current)
        })

        peer.on('connection', function (conn) {
            console.log('received connection from', conn)
            conn.on('open', function () {
                console.log('connection opened')
            })
        })

        peer.on('call', function (call) {
            // Answer the call, providing our mediaStream

            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: false,
                })
                .then((mediaStream) => {
                    localVideo.current.srcObject = mediaStream
                    localStream.current = mediaStream

                    call.answer(mediaStream)

                    call.on('stream', (remoteStream) => {
                        console.log('received host stream')
                        props.onAlert(
                            'Host has started broadcasting, you might want to use a headset.'
                        )
                        hostVideo.current.srcObject = remoteStream
                    })
                })
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

    return (
        <div>
            {/* <button
                    type="button"
                    className={`audio_switch_button`}>
                    <i className="fa fa-microphone fa-2x"></i>
                </button> */}
            <div className="participant-host-video-container">
                <span className="hide">Hide</span>
                <div className="host-video-container">
                    <video
                        ref={hostVideo}
                        muted
                        className="host-video"
                        autoPlay
                        playsInline></video>
                    <div className="video-label">
                        {isHost.current ? 'You' : 'Host'}
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

            {isHost.current ? (
                <button
                    type="button"
                    onClick={handleBroadcasting}
                    className={`audio_broadcast_btn-${
                        isBroadCasting === true ? 'started' : 'ended'
                    }`}>
                    <i className="fa fa-broadcast-tower fa-2x"></i>
                </button>
            ) : (
                ''
            )}
        </div>
    )
}
