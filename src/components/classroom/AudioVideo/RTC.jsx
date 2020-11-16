/* eslint-disable no-undef */
/** @format */

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import DetectRTC from 'detectrtc'
import VideoAudioPermission from '../Modals/VideoAndAudioPermission'
import RemoteVideoStream from './Components/Video'
import './index.css'

export default function RTC(props) {
    const yourID = useRef('')
    const [users, setUsers] = useState([])
    const usersRef = useRef();
    const [stream, setStream] = useState()

    const userVideo = useRef()
    const signalingSocket = useRef()
    const peersRef = useRef({})
    const mystream = useRef();
    const myData =  useRef();
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
        mystream.current = _stream;
        window.stream = {}
        window.stream[yourID.current] = _stream
        canCall.current = false
        usersRef.current  = (usersInClass);
        myData.current =
            usersInClass &&
            usersInClass.filter((user) => user.kid === yourID.current)[0];

        usersInClass &&
            usersInClass
                .filter((user) => user.kid !== yourID.current)
                .forEach((user) => {
                    user.socketid !== signalingSocket.current.id &&
                        callPeer(user, window.stream[yourID.current])
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
                    canCall.current && getUserMediaStream(data)
                })

                signalingSocket.current.on('offer', (data) => {
                        console.log('received offer ', data);

                    if (
                        !peersRef.current[data.caller.kid] &&
                        data.target.socketid === signalingSocket.current.id
                    ) {
                        // accept offer
                        handleRecieveCall(data, window.stream[yourID.current])
                    }
                })
                signalingSocket.current.on('answer', handleAnswer)

                signalingSocket.current.on(
                    'ice-candidate',
                    handleNewICECandidateMsg
                )
                 signalingSocket.current.on('updatechat_left', (msg) => {
                      setPeerStreams((s) => {
                          delete peersRef.current[msg.for]
                          const newUserStreams = s.filter(
                              (remoteStream_) =>
                                  remoteStream_.userSocketID !== msg.for
                          )
                          return newUserStreams
                      }) 
                 })
            }
        })
    }, [])

    function callPeer(user, myStream) {
        console.log('calling ', user)
       
        const peer = createPeer(user)
        myStream.getTracks().forEach((track) => peer.addTrack(track, myStream))
        return peer
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp)
        console.log('Got answer for ', message.caller)
        peersRef.current[message.caller.kid] &&
            peersRef.current[message.caller.kid]
                .setRemoteDescription(desc)
                .catch((e) => console.log(e))
        console.log(peersRef.current[message.caller.kid])
    }

    async function handleRecieveCall(incoming, myStream) {
        console.log('handling offer ', incoming);
        const newpeer = await createPeer(incoming.caller)
        console.log(newpeer)
        const desc = await new RTCSessionDescription(incoming.sdp)
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
                    caller: incoming.target,
                    sdp: newpeer.localDescription,
                }
                console.log('answer ready ', payload)
                signalingSocket.current.emit('answer', payload)
            })
    }

    function removeVideoTrack(){
        window.stream[yourID.current].getVideoTracks()[0].stop();

// if (videoTrack.length > 0) {
//     window.stream[yourID.current].removeTrack(videoTrack[0])
// }
    }

    async function addVideoTrack(){
          const _stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        })
        _stream.getVideoTracks()
    }

    function removeAudio(){

    }

    function addAudio(){

    }

    function createPeer(user) {
        const userkid = user.kid;
        
        if (peersRef.current[userkid]) return
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
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(user);

        peer.onicecandidate = (e) => handleICECandidateEvent(e, user);
        peer.ontrack = (e) => handleTrackEvent(e, user)

        peer.oniceconnectionstatechange = async () => {
            console.log(`${ peer.iceConnectionState }-state`)
            if (peer.iceConnectionState === 'disconnected') {
               await setPeerStreams((s) => {
                        console.log(s);
                        const newUserStreams = s.filter(
                            (remoteStream_) =>
                                remoteStream_ &&
                                remoteStream_.user.kid !== userkid
                        )
                        return newUserStreams
                })
              await delete peersRef.current[userkid];
              await peer.close();
            }
        }
        peersRef.current[userkid] = peer;
        console.log('created peer ',peersRef.current[userkid]);
        return peer
    }

    function handleICECandidateEvent(e, user) {
        if (e.candidate) {
            console.log('ice candidate updates')
            const payload = {
                target: user,
                candidate: e.candidate,
                sender: myData.current,
            }
            signalingSocket.current.emit('ice-candidate', payload)
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming.candidate)
        console.log('received ICE ', incoming)
        peersRef.current[incoming.sender.kid] &&
            peersRef.current[incoming.sender.kid]
                .addIceCandidate(candidate)
                .catch((e) => console.log(e))
    }

    function handleNegotiationNeededEvent(user) {
        console.log('initializing negotiation with user ',user);
        const {kid } = user

        peersRef.current[kid]
            .createOffer()
            .then((offer) => {
                console.log('created offer for ', user, offer);
                return peersRef.current[kid].setLocalDescription(offer)
            })
            .then(() => {
                const payload = {
                    target: user,
                    caller: myData.current,
                    sdp: peersRef.current[kid].localDescription,
                }
                console.log('ready to dispatch offer to peer ', payload)

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

    function hideRemoteVideo(userkid) {
        setPeerStreams((s) => {
            let newUserStreams = s
            newUserStreams = s.map((remoteStream_) => {
                if (remoteStream_ && remoteStream_.user.kid === userkid) {
                    const newStream = remoteStream_.stream
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

    function handleTrackEvent(e, user) {

        console.log('got stream for ', user.kid, e)

        user && user.kid &&  setPeerStreams((s) => {
                
                let newUserStreams = s;
                if (
                        newUserStreams.find(
                            (remoteStream) =>
                                String(remoteStream.user.kid) ===
                                String(user.kid)
                        )
                ) {
                    console.log('old stream , upating stream ', s)
                    newUserStreams = s.map((remotePeerStreamData) => {
                        if (remotePeerStreamData.user.kid === user.kid) {
                            return {
                                ...remotePeerStreamData,
                                stream: e.streams[0],
                            }
                        } else {
                            return stream
                        }
                    })
                    return newUserStreams
                } else {
                    console.log('new peer stream')
                  
                    newUserStreams.push({
                        user,
                        stream: e.streams[0],
                        video: true,
                        audio: true,
                    })
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
                        className={ `${
                            audioMuted ? 'userVideo-muted' : 'userVideo'
                        }` }
                        playsInline
                        muted
                        ref={ userVideo }
                        autoPlay
                    />
                    <span className="user_name_label">
                        {props.username} (You)
                    </span>

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
                                className={ `fa fa-microphone${
                                    audioMuted ? '-slash' : ''
                                } cursor-pointer` }></i>
                        </span>
                    </div>
                </div>

                {peerStreams.map(
                    (remotestream) =>
                        remotestream && (
                            <RemoteVideoStream
                                stream={ remotestream.stream }
                                hideVideo={ hideRemoteVideo }
                                video={ remotestream.video }
                                audio={ remotestream.audio }
                                isOwner={ props.isOwner }
                                user={ remotestream.user }
                                kid={ remotestream.user.kid }
                            />
                        )
                )}
            </div>
        </div>
    )
}
