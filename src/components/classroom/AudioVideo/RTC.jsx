/* eslint-disable no-undef */
/** @format */

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import Peer from 'simple-peer'
import DetectRTC from 'detectrtc'
import VideoAudioPermission from '../Modals/VideoAndAudioPermission'
import RemoteVideoStream from './Components/Video'
import './index.css'

export default function RTC(props) {
    const yourID = useRef('')
    const [users, setUsers] = useState([])
    const [stream, setStream] = useState()

    const userVideo = useRef()
    const signalingSocket = useRef()
    const peersRef = useRef({})
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [peerStreams, setPeerStreams] = useState([])

    const canCall = useRef(true)
    async function getUserMediaStream(usersInClass) {
        const _stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
        userVideo.current.srcObject = _stream
        setStream(_stream)
        window.stream = {}
        window.stream[yourID.current] = _stream
        canCall.current = false
        usersInClass &&
            usersInClass
                .filter((user) => user.kid !== yourID.current)
                .map((user_) => user_.socketid)
                .forEach((userSocketId) => {
                    userSocketId !== signalingSocket.current.id &&
                        callPeer(userSocketId, _stream)
                })
    }
    useEffect(() => {
        yourID.current = props.userkid && props.userkid
    }, [props.userkid])

    useLayoutEffect(async () => {
        DetectRTC.load(async function () {
            signalingSocket.current = (await props.socket) ? props.socket : null
            yourID.current = await props.userkid
            await setUsers(props.users)

            const hasWebcamForOutput = DetectRTC.hasWebcam
            const hasMicrophoneForOutput = DetectRTC.hasMicrophone

            if (!hasWebcamForOutput || !hasMicrophoneForOutput) {
                // show modal, telling the user they can't start webrtc calls without devices;
            } else {
                if (
                    !DetectRTC.isWebsiteHasMicrophonePermissions &&
                    !DetectRTC.isWebsiteHasWebcamPermissions
                ) {
                    setTimeout(() => {
                        document.querySelector('#video_permission') &&
                            document.querySelector('#video_permission').click()
                    }, 1500)
                }
                signalingSocket.current.on('classroom_users', (data) => {
                    console.log(data)
                    canCall.current && getUserMediaStream(data)
                })

                signalingSocket.current.on('offer', (data) => {
                    if (
                        !peersRef.current[data.caller] &&
                        data.target === signalingSocket.current.id
                    ) {
                        // accept offer
                        console.log('received offer')
                        handleRecieveCall(data, window.stream[yourID.current])
                    }
                })
                signalingSocket.current.on('answer', handleAnswer)

                signalingSocket.current.on(
                    'ice-candidate',
                    handleNewICECandidateMsg
                )
            }
        })
    }, [])

    function callPeer(userSocketId, myStream) {
        console.log('calling ', userSocketId)
        const peer = createPeer(userSocketId)
        myStream.getTracks().forEach((track) => peer.addTrack(track, myStream))
        return peer
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp)
        console.log('Got answer for ', message.caller)
        peersRef.current[message.caller] &&
            peersRef.current[message.caller]
                .setRemoteDescription(desc)
                .catch((e) => console.log(e))
        console.log(peersRef.current[message.caller])
    }

    function handleRecieveCall(incoming, myStream) {
        console.log('handling offer')
        const newpeer = createPeer(incoming.caller)
        console.log(newpeer)
        const desc = new RTCSessionDescription(incoming.sdp)
        newpeer
            .setRemoteDescription(desc)
            .then(() => {
                myStream
                    .getTracks()
                    .forEach((track) => newpeer.addTrack(track, myStream))
            })
            .then(() => {
                return newpeer.createAnswer()
            })
            .then((answer) => {
                return newpeer.setLocalDescription(answer)
            })
            .then(() => {
                const payload = {
                    target: incoming.caller,
                    caller: signalingSocket.current.id,
                    sdp: newpeer.localDescription,
                }
                console.log('answer ready ', payload)
                signalingSocket.current.emit('answer', payload)
            })
    }

    function createPeer(userSocketID) {
        if (peersRef.current[userSocketID]) return
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org',
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com',
                },
                {
                    url: 'turn:turn.azcryptotrade.com:3478',
                    credential: 'turnadmin',
                    username: '@P@$$w0rd',
                },
            ],
        })
        /**
         * Called once  after a peer object has been created
         * - We create offer for a user here and dispatch with socket.io
         */
        peer.onnegotiationneeded = () =>
            handleNegotiationNeededEvent(userSocketID)
        peer.onicecandidate = (e) => handleICECandidateEvent(e, userSocketID)
        peer.oniceconnectionstatechange = (ev) => {
            console.log(`${ peer.iceConnectionState }-state`)
            if (peer.iceConnectionState === 'disconnected') {
                setPeerStreams((s) => {
                        delete peersRef.current[userSocketID];
                        const newUserStreams = s.filter((remoteStream_) =>  (remoteStream_.userSocketID !== userSocketID))
                        return newUserStreams
                }) 
            }
        }
        peer.ontrack = (e) => handleTrackEvent(e, userSocketID)
        peersRef.current[userSocketID] = peer
        return peer
    }

    function handleICECandidateEvent(e, userSocketID) {
        if (e.candidate) {
            console.log('ice candidate updates')
            const payload = {
                target: userSocketID,
                candidate: e.candidate,
                sender: signalingSocket.current.id,
            }
            signalingSocket.current.emit('ice-candidate', payload)
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming.candidate)
        console.log('received ICE ', incoming)
        peersRef.current[incoming.sender] &&
            peersRef.current[incoming.sender]
                .addIceCandidate(candidate)
                .catch((e) => console.log(e))
    }
    function handleNegotiationNeededEvent(userSokcetID) {
        peersRef.current[userSokcetID]
            .createOffer()
            .then((offer) => {
                return peersRef.current[userSokcetID].setLocalDescription(offer)
            })
            .then(() => {
                const payload = {
                    target: userSokcetID,
                    caller: signalingSocket.current.id,
                    sdp: peersRef.current[userSokcetID].localDescription,
                }
                signalingSocket.current.emit('offer', payload)
            })
            .catch((e) => console.log(e))
    }

    function hideVideo(e) {
        e.preventDefault()
        if (stream) {
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
        }
    }

        function hideAudio(e) {
            e.preventDefault()
            if (stream) {
                setAudioMuted(!audioMuted)
                stream.getAudioTracks()[0].enabled = audioMuted
            }
        }

    function hideRemoteVideo(userSocketID) {
        setPeerStreams((s) => {
            let newUserStreams = s
            newUserStreams = s.map((remoteStream_) => {
                if (remoteStream_.userSocketID === userSocketID) {
                    const newStream = remoteStream_.stream;
                    newStream.getVideoTracks()[0].enabled = !newStream.getVideoTracks()[0]
                        .enabled
                    return {
                        ...remoteStream_,
                        stream: newStream,
                        video: !newStream.getVideoTracks()[0].enabled,
                    }
                } else {
                    return stream
                }
            })
            return newUserStreams
        })
    }

    function handleTrackEvent(e, userSocketID) {
            setPeerStreams((s) => {
                let newUserStreams = s;
                if (
                    s.find((remoteStream) => remoteStream.userSocketID === userSocketID)
                ) {

                     newUserStreams = s.map((remoteStream_) => {
                         if (remoteStream_.userSocketID === userSocketID) {
                             return { ...remoteStream_, stream: e.streams[0] }
                         } else {
                             return stream
                         }
                     })
                        return newUserStreams
                } else {
                        newUserStreams = [...s, { userSocketID, stream: e.streams[0], video: true, audio: true }]
                }
                return newUserStreams;
            }) 
    }
    return (
        <div className="participant-host-video-container">
            <VideoAudioPermission />
            <span className="hide d-flex align-items-center justify-content-between">
                <div>
                    <i className="fa fa-video mr-1"></i> Video call
                </div>
                {props.isOwner ? (
                    <i className="fa fa-users-cog mr-2 group-audio-settings"></i>
                ) : (
                    ''
                )}
            </span>
            <div className="videos-remote-user">
                <div className="video-container">
                    <video
                        className={ `${ audioMuted ? 'userVideo-muted': 'userVideo' }` }
                        playsInline
                        muted
                        ref={ userVideo }
                        autoPlay
                    />
                    <div className="video-audio-controls">
                        <span
                            className="video-audio-icon-button"
                            onClick={ hideVideo }>
                            <i
                                className={ `fa fa-video${
                                    videoMuted ? '-slash' : ''
                                } cursor-pointer` }></i>
                        </span>
                        <span
                            onClick={ hideAudio }
                            className="video-audio-icon-button">
                            <i
                                className={
                                    `fa fa-microphone${ audioMuted ? '-slash': '' } cursor-pointer`
                                }></i>
                        </span>
                    </div>
                </div>

                {peerStreams.map((remotestream) => (
                    <RemoteVideoStream
                        stream={ remotestream.stream }
                        hideVideo={ hideRemoteVideo }
                        video={ remotestream.video }
                        audio={ remotestream.audio }
                        usersSocketID={ remotestream.userSocketID }
                    />
                ))}
            </div>
        </div>
    )
}
