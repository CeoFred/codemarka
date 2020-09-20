/* eslint-disable no-undef */
/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/* eslint-disable react/prop-types */
/** @format */

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
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
    const mutedAll = useRef(false)
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
        audioOutput:{
            deviceId : undefined
        }
    })

    useEffect(() => {
        usersRef.current = props.users
    }, [props.users])

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
                ){
                     AudioVideoContraints.current.audio.deviceId = {
                         exact: props.defaultInputOutput.audioinput.deviceId,
                     }
                     if(isHost.current && isBroadCasting){
                            navigator.mediaDevices
                                .getUserMedia({
                                    video: AudioVideoContraints.current.video,
                                    audio: AudioVideoContraints.current.audio,
                                })
                                .then((mediaStream) => {
                                 var audioTrack = window.stream.getAudioTracks()
                                 if (audioTrack.length > 0) {
                                     window.stream.removeTrack(audioTrack[0])
                                     const newStream = mediaStream.getAudioTracks();
                                     window.stream.addTrack(newStream[0]);
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
                    { url: 'stun:stun.I.google.com:19302' },
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
            console.log('peerjs connection opened ', id)
            if (props.isBroadcasting && props.isOwner) {
                HostcallUsers()
            }
        })

        peerRef.current.on('error', function(e){
            console.log(e);
        });

        peerRef.current.on('close', function(){
            console.log('closed connection')
        })
    }, [])

    useEffect(() => {
        socketRef.current.on('call_me', (user) => {
            console.log('should call', user)
            if (isHost.current && user.kid !== props.userkid) {
                updateDeviceList()
                navigator.mediaDevices
                    .getUserMedia({
                        video: AudioVideoContraints.current.video,
                        audio: AudioVideoContraints.current.audio,
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
                if (id === socketRef.current.id) setIsBroadCasting((br) => true)
                if (isHost.current) {
                    console.log(AudioVideoContraints.current)
                    HostcallUsers();
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
            console.log('received a call ', call)
                updateDeviceList()
            navigator.mediaDevices
                .getUserMedia({
                    video: AudioVideoContraints.current.video,
                    audio: AudioVideoContraints.current.audio,
                })
                .then((mediaStream) => {
                    window.stream = mediaStream;
                    localVideo.current.srcObject = mediaStream
                    localStream.current = mediaStream

                    call.answer(mediaStream)

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
                        console.log('closed')
                    })

                    call.on('disconnected', function () {
                        onCall.current = false
                        console.log('disconnected')
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
                    HostcallUsers();
                } else {
                    onCall.current = false
                }
            } else {
                console.log('Non fatal error: ', e.type)
            }
        })
    }, [])

    async function updateDeviceList(){
       await navigator.mediaDevices
            .enumerateDevices()
            .then(function (deviceInfos) {
                for (var i = 0; i !== deviceInfos.length; ++i) {
                    const deviceInfo = deviceInfos[i]
                    setInputOutputSettings((s) => {
                        const deviceType = s[deviceInfo.kind];
                        const exists = deviceType.some(devices => {
                            return devices.deviceId === deviceInfo.deviceId && devices.groupId === deviceInfo.groupId && devices.label === deviceInfo.label
                        });
                        if(!exists){
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
            updateDeviceList().then(done => {
                console.log('done updating devices');
            })
        }
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

    function HostcallUsers(){
                  updateDeviceList().then(done => {
                      console.log('done updating media')
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
                                usersRef.current.filter((user) => user.kid !== props.userkid).forEach(filtered => {
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
        console.log('calling user ',user)
        const conn = peerRef.current.connect(user.kid, { reliable: true })
        if (conn) {
            conn.on('open', () => {
                console.log('connection opened for user ', user)

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
                    if (document.querySelector(`div#${ user.kid }`)) {
                        document.querySelector(`div#${ user.kid }`).remove()
                    }
                })
            })
        }
    }

    function handleMuteAllUsers(){
        mutedAll.current = true;
    }

    function handleUnMuteAllUsers(){
        mutedAll.current = false;
    }
    return (
        <div className="h-100" style={ { backgroundColor: '#0f0f0f' } }>
            {/* <button
                    type="button"
                    className={`audio_switch_button`}>
                    <i className="fa fa-microphone fa-2x"></i>
                </button> */}
            <div className="participant-host-video-container">
                <span className="hide">
                    <div>
                        <i className="fa fa-video mr-2"></i> Video chat
                    </div>
                    {/* {isHost.current ? (
                        <div>
                            {!mutedAll.current ? (
                                <i
                                    className="fa fa-microphone text-success"
                                    title="Mute All"
                                    onClick={ handleMuteAllUsers }></i>
                            ) : (
                                <i className="fa fa-microphone-slash text-danger" onClick={ handleUnMuteAllUsers } title="Unmute All"></i>
                            )}{' '}
                        </div>
                    ) : (
                        ''
                    )}{' '} */}
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

                        {/* <div className="mediaControls">
                            <span>
                                <i className="fa fa-microphone-alt"></i>
                                <i
                                    className="fas fa-video"
                                    onClick={switchHostVideo}></i>
                            </span>
                        </div> */}
                    </div>
                    {!isHost.current ? (
                        <div className="local-video-container">
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
