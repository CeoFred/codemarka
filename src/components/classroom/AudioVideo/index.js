/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/* eslint-disable react/prop-types */
/** @format */

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Peer from 'peerjs'

import * as classroomActions from '../../../store/actions/classRoom'
import './index.css'

function AudioVideoBroadcast(props) {
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
    const [mutedAll, setMutedAll] = useState(false)
    const [allUsersVideoOff, setAllUsersvideoOff] = useState(false)
    const [myVideoState, setMyVideoStatus] = useState(true)
    const onCall = useRef(false)
    const hostVideoStatus = useRef(false)
    const hostAudioStatus = useRef(false)
    const [isBroadCasting, setIsBroadCasting] = useState(false)
    const [inputOutputSettings, setInputOutputSettings] = useState({
        audioinput: [],
        audiooutput: [],
        videoinput: [],
    })
    const AudioVideoContraints = useRef({
        audio: {
            deviceId: { exact: undefined },
        },
        video: {
            deviceId: { exact: undefined },
        },
        audioOutput: {
            deviceId: undefined,
        },
    })

    useEffect(() => {
        usersRef.current = props.users
    }, [props.users])

    toast.configure({
        autoClose: 6000,
        draggable: true,
    })

    /**
     * Effect to run when audio input or output source is
     * changed.
     */
    useEffect(() => {
        if (props.defaultInputOutput) {
            if (props.defaultInputOutput.audioinput) {
                if (
                    props.defaultInputOutput.audioinput.deviceId !==
                    AudioVideoContraints.current.audio.deviceId
                ) {
                    AudioVideoContraints.current.audio.deviceId = {
                        exact: props.defaultInputOutput.audioinput.deviceId,
                    }
                    if (isHost.current && isBroadCasting) {
                        navigator.mediaDevices
                            .getUserMedia({
                                video: AudioVideoContraints.current.video,
                                audio: AudioVideoContraints.current.audio,
                            })
                            .then((mediaStream) => {
                                var audioTrack = window.stream.getAudioTracks()
                                if (audioTrack.length > 0) {
                                    window.stream.removeTrack(audioTrack[0])
                                    const newStream = mediaStream.getAudioTracks()
                                    window.stream.addTrack(newStream[0])
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            }
            if (props.defaultInputOutput.videoinput) {
                if (
                    props.defaultInputOutput.videoinput.deviceId !==
                    AudioVideoContraints.current.video.deviceId
                ) {
                    AudioVideoContraints.current.video.deviceId = {
                        exact: props.defaultInputOutput.videoinput.deviceId,
                    }
                    //call users again
                    if (isHost.current && isBroadCasting) {
                        HostcallUsers()
                    }
                }
            }
        } else {
            AudioVideoContraints.current.audio.deviceId = {
                exact: undefined,
            }
            AudioVideoContraints.current.audio.deviceId = {
                exact: undefined,
            }
        }
    }, [props.defaultInputOutput])

    useEffect(() => {
        props.setInputDevices(inputOutputSettings)
    }, [inputOutputSettings])

    useEffect(() => {
        socketRef.current = props.socket
        isHost.current = props.isOwner

        const peer = new Peer(props.userkid, {
            host: 'peerjs-server.herokuapp.com',
            port: 443,
            debug: 3,
            key: 'peerjs',
            secure: true,
            config: {
                iceServers: [
                    { url: 'stun:numb.viagenie.ca' },
                    {
                        url: 'turn:turn.azcryptotrade.com:3478',
                        credential: 'turnadmin',
                        username: '@P@$$w0rd',
                    },
                ],
            },
        })
        peerRef.current = peer

        peerRef.current.on('open', function (id) {
            PeerId.current = id
            // console.log('connection opened ', peer)
            if (props.isBroadcasting && props.isOwner) {
                HostcallUsers()
            }
        })

        peerRef.current.on('error', function (e) {
            console.log(e)
        })

        peerRef.current.on('close', function () {
            console.log('closed connection')
        })
    }, [])

    useEffect(() => {
        socketRef.current.on('call_me', (user) => {
            // console.log('should call', user)
            if (isHost.current && user.kid !== props.userkid) {
                updateDeviceList()
                navigator.mediaDevices
                    .getUserMedia({
                        video: AudioVideoContraints.current.video,
                        audio: AudioVideoContraints.current.audio,
                    })
                    .then((mediaStream) => {
                        window.stream = mediaStream
                        setIsBroadCasting(true)
                        hostVideoStatus.current = true
                        hostAudioStatus.current = true
                        hostVideo.current.srcObject = window.stream
                        localStream.current = window.stream
                        callUser(user)
                    })
            }
        })
        socketRef.current.on('broadcast_status', (status, id) => {
            if (status) {
                if (id === socketRef.current.id) setIsBroadCasting((br) => true)
                if (isHost.current) {
                    HostcallUsers()
                }
            } else {
                props.onAlert('Failed to start broadcast,try again')
                setIsBroadCasting((br) => false)
                setPeers([])
                peersRef.current = []
            }
        })
        socketRef.current.on('turn_video_off_all_successfully', (status) => {
            if (!isHost.current) {
                toast.info('Your video has been turned off by host', {
                    position: 'bottom-center',
                })
                if (window.stream) {
                    var videoTrack = window.stream.getVideoTracks()
                    if (videoTrack && videoTrack.length > 0) {
                        window.stream.oldVideoTrack = videoTrack
                        videoTrack.forEach((video) => {
                            window.stream.removeTrack(video)
                        })
                        setMyVideoStatus(false)
                    }
                }
            } else {
                if (window.usersStreams) {
                    for (const key in window.usersStreams) {
                        if (window.usersStreams.hasOwnProperty(key)) {
                            const userTrack = window.usersStreams[key]
                            var videoTrack = userTrack.getVideoTracks()
                            if (videoTrack.length > 0) {
                                userTrack.oldVideoTrack = videoTrack
                                videoTrack.forEach((video) => {
                                    userTrack.removeTrack(video)
                                })
                                if (
                                    document.querySelector(
                                        `#wrapper-on-muted${ key }`
                                    )
                                ) {
                                    document
                                        .querySelector(
                                            `#wrapper-on-muted${ key }`
                                        )
                                        .classList.remove('d-none')
                                    document
                                        .querySelector(
                                            `#wrapper-on-muted${ key }`
                                        )
                                        .classList.add('d-flex')
                                }
                            }
                        }
                    }
                }
            }
        })
        socketRef.current.on('turn_video_on_all_successfully', (status) => {
            if (!isHost.current) {
                toast.info('Your video has been turned on by host', {
                    position: 'bottom-center',
                })
                if (window.stream) {
                    var videoTrack = window.stream.oldVideoTrack
                    if (videoTrack && videoTrack.length > 0) {
                        videoTrack.forEach((video) => {
                            window.stream.addTrack(video)
                        })
                        setMyVideoStatus(true)
                    }
                }
            } else {
                if (window.usersStreams) {
                    for (const key in window.usersStreams) {
                        if (window.usersStreams.hasOwnProperty(key)) {
                            const userTrack = window.usersStreams[key]
                            var videoTrack = userTrack.oldVideoTrack
                            if (videoTrack.length > 0) {
                                videoTrack.forEach((video) => {
                                    userTrack.addTrack(video)
                                })
                                if (
                                    document.querySelector(
                                        `#wrapper-on-muted${ key }`
                                    )
                                ) {
                                    document
                                        .querySelector(
                                            `#wrapper-on-muted${ key }`
                                        )
                                        .classList.add('d-none')
                                    document
                                        .querySelector(
                                            `#wrapper-on-muted${ key }`
                                        )
                                        .classList.remove('d-flex')
                                }
                            }
                        }
                    }
                }
            }
        })
        socketRef.current.on('muted_successfully', (status) => {
            if (!isHost.current) {
                toast.info('Your mic has been muted by host', {
                    position: 'bottom-center',
                })
            } else {
                if (window.usersStreams) {
                    for (const key in window.usersStreams) {
                        if (window.usersStreams.hasOwnProperty(key)) {
                            const userTrack = window.usersStreams[key]
                            var audioTrack = userTrack.getAudioTracks()
                            if (audioTrack.length > 0) {
                                userTrack.oldAudoTrack = audioTrack
                                audioTrack.forEach((audio) => {
                                    //   console.log(audio)
                                    userTrack.removeTrack(audio)
                                })
                                var tracks = userTrack.getAudioTracks()
                                //   console.log(tracks)
                            }
                        }
                    }
                }
            }
        })
        socketRef.current.on('unmuted_successfully', (status) => {
            if (!isHost.current && status) {
            } else {
                if (window.usersStreams) {
                    for (const key in window.usersStreams) {
                        if (window.usersStreams.hasOwnProperty(key)) {
                            const userTrack = window.usersStreams[key]
                            var audioTrack = userTrack.oldAudoTrack
                            if (audioTrack.length > 0) {
                                audioTrack.forEach((audio) => {
                                    console.log(audio)
                                    userTrack.addTrack(audio)
                                })
                            }
                        }
                    }
                }
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
                }
                if (window.stream) {
                    window.stream.getTracks().forEach(function (track) {
                        track.stop()
                    })
                }
                hostVideo.current.srcObject = null
                setPeers([])

                peersRef.current = []
                onCall.current = false
                props.onAlert('Host has ended live broadcast.')
            }
        })

        socketRef.current.on('operation_failed', (reason) => {
            props.onAlert(reason)
            setIsBroadCasting((br) => false)
        })

        peerRef.current.on('connection', function (conn) {
            console.log('received connection from ', conn)
            conn.on('open', function () {
                // console.log('connection opened')
            })
        })

        peerRef.current.on('call', function (call) {
            // Answer the call, providing our mediaStream
            // console.log('received a call ', call)
            updateDeviceList()
            if(!localStorage.getItem('allowed_media_permission')){
                 document.getElementById('myAudio').click();
                document.getElementById('myAudio').play()
                document.querySelector('#video_permission').click();
            }
            navigator.mediaDevices
                .getUserMedia({
                    video: AudioVideoContraints.current.video,
                    audio: AudioVideoContraints.current.audio,
                })
                .then((mediaStream) => {
                    localStorage.setItem('allowed_media_permission',true);
                    window.stream = mediaStream
                    localVideo.current.srcObject = window.stream
                    localStream.current = window.stream

                    call.answer(window.stream)

                    call.on('stream', (remoteStream) => {
                        hostVideo.current.srcObject = remoteStream
                        onCall.current = true
                        setIsBroadCasting((br) => true)
                    })

                    call.on('error', (e) => {
                        onCall.current = false
                        console.log(e)
                    })

                    call.on('close', function () {
                        onCall.current = false
                        // console.log('closed')
                    })

                    call.on('disconnected', function () {
                        onCall.current = false
                        // console.log('disconnected')
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
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
                if (isHost.current && isBroadCasting) {
                    HostcallUsers()
                } else {
                    onCall.current = false
                }
            } else {
                console.log('Non fatal error: ', e.type)
            }
        })
    }, [])

    async function updateDeviceList() {
        await navigator.mediaDevices
            .enumerateDevices()
            .then(function (deviceInfos) {
                for (var i = 0; i !== deviceInfos.length; ++i) {
                    const deviceInfo = deviceInfos[i]
                    setInputOutputSettings((s) => {
                        const deviceType = s[deviceInfo.kind]
                        const exists = deviceType.some((devices) => {
                            return (
                                devices.deviceId === deviceInfo.deviceId &&
                                devices.groupId === deviceInfo.groupId &&
                                devices.label === deviceInfo.label
                            )
                        })
                        if (!exists) {
                            s[deviceInfo.kind].push(deviceInfo)
                            props.setInputDevices(s)
                        }
                        return {
                            ...s,
                        }
                    })
                }
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    useEffect(() => {
        navigator.mediaDevices.ondevicechange = function (event) {
            updateDeviceList().then((done) => {
                // console.log('done updating devices');
            })
        }
    }, [])

    useLayoutEffect(() => {
        updateDeviceList()
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

    function HostcallUsers() {
        updateDeviceList().then((done) => {
            //   console.log('done updating media')
            navigator.mediaDevices
                .getUserMedia({
                    video: AudioVideoContraints.current.video,
                    audio: AudioVideoContraints.current.audio,
                })
                .then((mediaStream) => {
                    setIsBroadCasting((br) => true)
                    hostVideoStatus.current = true
                    hostAudioStatus.current = true
                    if (window.stream) window.stream = null
                    window.stream = mediaStream
                    hostVideo.current.srcObject = window.stream
                    localStream.current = window.stream
                    usersRef.current
                        .filter((user) => user.kid !== props.userkid)
                        .forEach((filtered) => {
                            callUser(filtered)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    function callUser(user) {
        delete peerConnections.current[user.kid]
        console.log('calling user ', user)
        const conn = peerRef.current.connect(user.kid, { reliable: true })
        if (conn) {
            conn.on('open', () => {
                // console.log('connection opened for user ', user)

                peerConnections.current[user.kid] = {
                    metadata: user,
                }
                const call = peerRef.current.call(user.kid, localStream.current)

                call.on('stream', function (stream) {
                    // console.log('User has amswered')
                    if (window.usersStreams) {
                        window.usersStreams[user.kid] = stream
                    } else {
                        window.usersStreams = {
                            [user.kid]: stream,
                        }
                    }
                    peerConnections.current[user.kid] = {
                        ...peerConnections.current[user.kid],
                        stream,
                    }
                    setIsBroadCasting((br) => true)

                    if (document.querySelector(`div#${ user.kid }`)) {
                        document.querySelector(`div#${ user.kid }`).remove()
                    }
                    var videoDivContainer = document.createElement('div')
                    videoDivContainer.classList.add(
                        'remote-participant-video-container'
                    )
                    videoDivContainer.id = user.kid
                    var videoLabel = document.createElement('div')
                    videoLabel.classList.add('video-label')
                    videoLabel.innerText = `@${ user.username }`
                    var wrapperOnMuted = document.createElement('div')
                    wrapperOnMuted.innerHTML = `@${ user.username }`
                    wrapperOnMuted.classList.add('wrapper-on-muted')
                    wrapperOnMuted.classList.add('d-none')
                    wrapperOnMuted.id = `wrapper-on-muted${ user.kid }`
                    var videlem = document.createElement('video')
                    videlem.srcObject = stream
                    videlem.autoplay = true
                    videlem.id = user.kid
                    videlem.playsInline = true
                    videoDivContainer.appendChild(wrapperOnMuted)
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
                    if (document.querySelector(`div#${ user.kid }`)) {
                        document.querySelector(`div#${ user.kid }`).remove()
                    }
                })
            })
        }
    }

    function handleMuteAllUsers() {
        if (isHost.current && isBroadCasting) {
            socketRef.current.emit('mute_All', props.kid, new Date())
            setMutedAll(true)
        }
    }

    function handleUnMuteAllUsers() {
        if (isHost.current && isBroadCasting) {
            socketRef.current.emit('unmute_All', props.kid, new Date())
            setMutedAll(false)
        }
    }
    function handleOffVideoAllUsers() {
        if (isHost.current && isBroadCasting) {
            socketRef.current.emit('turn_video_off_all', props.kid, new Date())
            setAllUsersvideoOff(true)
        }
    }

    function handleOnVideoAllUsers() {
        if (isHost.current && isBroadCasting) {
            socketRef.current.emit('turn_video_on_all', props.kid, new Date())
            setAllUsersvideoOff(false)
        }
    }
    return (
        <div className="h-100" style={ { backgroundColor: '#0f0f0f' } }>
            <ToastContainer />

            <audio id="myAudio" className="d-none">
                <source
                    src="https://notificationsounds.com/soundfiles/44c4c17332cace2124a1a836d9fc4b6f/file-sounds-1147-that-was-quick.wav"
                    type="audio/wav"
                />
                <source
                    src="https://notificationsounds.com/soundfiles/44c4c17332cace2124a1a836d9fc4b6f/file-sounds-1147-that-was-quick.mp3"
                    type="audio/mpeg"
                />
            </audio>
            <div className="participant-host-video-container">
                <span className="hide d-flex align-items-center justify-content-between">
                    <div>
                        <i className="fa fa-video mr-2"></i> Video chat
                    </div>
                    {isHost.current ? (
                        <div
                            title="General Video Settings"
                            className="nav-item dropdown">
                            <span
                                className="nav-link nav-link-icon"
                                id="navbar-success_dropdown_1"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <i className="fa fa-ellipsis-v"></i>
                            </span>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbar-success_dropdown_1">
                                <div
                                    style={ { cursor: 'pointer' } }
                                    className="dropdown-item"
                                    onClick={
                                        mutedAll
                                            ? handleUnMuteAllUsers
                                            : handleMuteAllUsers
                                    }>
                                    {mutedAll ? 'Unmute All' : 'Mute All'}
                                </div>

                                <div className="dropdown-divider"></div>
                                <a
                                    style={ { cursor: 'pointer' } }
                                    className="dropdown-item"
                                    onClick={
                                        allUsersVideoOff
                                            ? handleOnVideoAllUsers
                                            : handleOffVideoAllUsers
                                    }>
                                    {allUsersVideoOff
                                        ? 'Turn on cameras'
                                        : 'Turn off cameras'}
                                </a>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </span>

                <div className="video-container">
                    <div className="host-video-container">
                        <video
                            ref={ hostVideo }
                            muted={ isHost.current ? true : false }
                            className="host-video"
                            autoPlay
                            playsInline></video>
                        <div className="video-label">
                            {isHost.current ? 'You' : 'Host'}
                        </div>
                    </div>
                    {!isHost.current ? (
                        <div className="local-video-container">
                            {!myVideoState && isBroadCasting ? (
                                <div className="my-video-off-wrapper">
                                    <i className="fa fa-video-slash"></i>
                                </div>
                            ) : (
                                ''
                            )}
                            <video
                                ref={ localVideo }
                                className="local-video"
                                autoPlay
                                muted
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
                        onClick={ handleBroadcasting }
                        className={ `btn w-100 btn-sm btn-outline-${
                            isBroadCasting === true ? 'success' : 'info'
                        }` }>
                        {isBroadCasting ? 'Hang Up' : 'Call In '}
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
const matchDispatchToProps = (dispatch) => {
    return {
        updateDefaultInputOutput: (data) =>
            dispatch(classroomActions.setDefaultInputOutputDevices(data)),
        setInputDevices: (data) =>
            dispatch(classroomActions.setInputOuputDevices(data)),
    }
}

const mapStateToProps = ({ classroom }) => {
    return {
        defaultInputOutput: classroom.defaultAudioVideoConfig,
    }
}
export default connect(
    mapStateToProps,
    matchDispatchToProps
)(AudioVideoBroadcast)
