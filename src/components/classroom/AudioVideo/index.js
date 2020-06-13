/** @format */

// /** @format */

// import React, { useEffect, useRef, useState } from 'react'
// import Peer from 'simple-peer'
// import styled from 'styled-components'
// import './index.css'

// const StyledVideo = styled.video`
//     height: 160px;
//     width: 160px;
//     margin-left: 40pc;
//     margin-top: 11pc;
//     z-index: 9999;
//     position: absolute;
//     border: 3px solid pink;
// `

// const LocalVideo = styled.video`
//     height: 160px;
//     width: 160px;
//     margin-left: 40pc;
//     margin-top: 30pc;
//     z-index: 9999;
//     position: absolute;
//     border: 3px solid grey;
// `

// const Video = (props) => {
//     const ref = useRef()

//     useEffect(() => {
//         ref.current.srcObject = props.stream
//         console.log(props.stream)
//     }, [])

//     return <StyledVideo playsInline autoPlay ref={ref} />
// }

// const videoConstraints = {
//     height: window.innerHeight / 2,
//     width: window.innerWidth / 2,
// }

// const Room = (props) => {
//     const [peers, setPeers] = useState([])

//     const socketRef = useRef()
//     const localVideo = useRef()
//     const remoteVideo = useRef()
//     const localStream = useRef()
//     const answersFrom = useRef({})
//     const peersRef = useRef([])
//     const localPeerConnectionRef = useRef()
//     const roomID = props.kid

//     const [isBroadCasting, setIsBroadCasting] = useState(false)

//     const peerConnection =
//         window.RTCPeerConnection ||
//         window.mozRTCPeerConnection ||
//         window.webkitRTCPeerConnection ||
//         window.msRTCPeerConnection

//     const sessionDescription =
//         window.RTCSessionDescription ||
//         window.mozRTCSessionDescription ||
//         window.webkitRTCSessionDescription ||
//         window.msRTCSessionDescription

//     const config = {
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//     }

//     useEffect(() => {
//         socketRef.current = props.socket

//         socketRef.current.on('broadcast_end_confirmed', (status) => {
//             if (status) {
//                 localVideo.current.srcObject = null
//                 setPeers([])
//                 peersRef.current = []
//                 props.onAlert('Audio Broadcast Has Ended')
//             }
//         })

//         socketRef.current.on('operation_failed', (reason) => {
//             props.onAlert(reason)
//             setIsBroadCasting((br) => false)
//         })

//         socketRef.current.on('all_users', (users) => {
//             navigator.mediaDevices
//                 .getUserMedia({ video: videoConstraints, audio: false })
//                 .then((stream) => {
//                     localVideo.current.srcObject = stream
//                     localStream.current = stream
//                     setUpLocalPeer(users)
//                 })
//         })

//         socketRef.current.on('answer-made', (data) => {
//             const answer = data.answer
//             const answerTo = data.to
//             const answerFrom = data.from
//             console.log('host received answer', data)

//             localPeerConnectionRef.current.setRemoteDescription(
//                 new sessionDescription(answer),
//                 function () {
//                     answersFrom.current[data.from] = true
//                 },
//                 error
//             )
//             console.log(
//                 'answer made from',
//                 answerFrom,
//                 localPeerConnectionRef.current
//             )
//         })

//         socketRef.current.on('offer-made', function (data) {
//             const offer = data.offer
//             const offerTo = data.to
//             const offerFrom = data.from

//             console.log('received offer')
//             const pc = new peerConnection(config)

//             //     pc.addEventListener('icecandidate', (e) =>
//             //     onIceCandidate(pc, e)
//             // )

//             // pc.addEventListener('track', (e) =>
//             //     gotRemoteStream(e, 'Receiver')
//             // )
//             pc.ontrack = ({ streams: [stream] }) => {
//                 console.log(stream)

//                 stream.onaddtrack = (e) => {
//                     console.log('track added to stream', e)
//                     remoteVideo.current.srcObject = stream
//                     e.track.onunmute = () => {
//                         remoteVideo.current.srcObject = stream
//                     }
//                 }
//                 remoteVideo.current.srcObject = stream
//                 console.log(remoteVideo.current.srcObject.getVideoTracks())
//                 document
//                     .getElementById('remoteVid')
//                     .setAttribute('srcObject', stream)
//             }
//             pc.setRemoteDescription(
//                 new sessionDescription(data.offer),
//                 function () {
//                     pc.createAnswer(function (answer) {
//                         pc.setLocalDescription(
//                             new sessionDescription(answer),
//                             function () {
//                                 console.log('MAKE ANSWER')

//                                 socketRef.current.emit('make-answer', {
//                                     answer: answer,
//                                     to: offerFrom,
//                                 })

//                                 // Add stream
//                                 navigator.mediaDevices
//                                     .getUserMedia({
//                                         video: true,
//                                         audio: false,
//                                     })
//                                     .then((stream) => {
//                                         console.log(
//                                             'setting stream as local after answering',
//                                             stream
//                                         )
//                                         localVideo.current.srcObject = stream
//                                         localStream.current = stream
//                                         localStream.current
//                                             .getTracks()
//                                             .forEach((track) =>
//                                                 pc.addTrack(
//                                                     track,
//                                                     localStream.current
//                                                 )
//                                             )
//                                         const videoTracks = localStream.current.getVideoTracks()
//                                         if (videoTracks.length > 0) {
//                                             console.log(
//                                                 `Using video track: ${videoTracks}`
//                                             )
//                                         }
//                                     })
//                             },
//                             error
//                         )
//                     }, error)
//                 },
//                 error
//             )
//         })

//         socketRef.current.on('broadcast_status', (status, id) => {
//             if (status) {
//                 // call users

//                 if (id === socketRef.current.id)
//                     socketRef.current.emit('start_broadcast', roomID)

//                 props.onAlert('Broadcast has started')
//             } else {
//                 props.onAlert('Failed to start broadcast,try again')
//                 setPeers([])
//                 peersRef.current = []
//                 setIsBroadCasting((br) => !br)
//             }
//         })
//     }, [])

//     function gotRemoteStream(e, person) {
//         // if (remoteVideo.srcObject !== e.streams[0]) {
//         //   remoteVideo.srcObject = e.streams[0];
//         //   console.log('pc2 received remote stream');
//         // }
//         // peersRef.current.push(e.streams[0])
//         // setPeers([...peers, e.streams[0]])

//         // const video = document.createElement('video').srcObject = e.streams[0];
//         remoteVideo.current = e.streams[0]
//         remoteVideo.current.play()
//         console.log(person, ' got remote track ', e.streams[0], e)
//     }

//     async function setUpLocalPeer(users) {
//         const offerOptions = {
//             offerToReceiveAudio: 0,
//             offerToReceiveVideo: 1,
//         }

//         console.log('Starting call all participants')

//         const videoTracks = localStream.current.getVideoTracks()

//         if (videoTracks.length > 0) {
//             console.log(`Using video device: ${videoTracks[0]}`)
//         }

//         localPeerConnectionRef.current = new RTCPeerConnection(config)

//         localPeerConnectionRef.current.ontrack = ({ streams: [stream] }) => {
//             console.log(stream)

//             stream.onaddtrack = (e) => {
//                 console.log('track added to stream', e)
//                 remoteVideo.current.srcObject = stream
//             }
//             remoteVideo.current.srcObject = stream
//             remoteVideo.current.play()
//             console.log(remoteVideo.current)
//         }
//         console.log('Created local peer connection object localPeerConnection')
//         localPeerConnectionRef.current.addEventListener('icecandidate', (e) =>
//             onIceCandidate(localPeerConnectionRef.current, e)
//         )
//         localStream.current
//             .getTracks()
//             .forEach((track) =>
//                 localPeerConnectionRef.current.addTrack(
//                     track,
//                     localStream.current
//                 )
//             )

//         try {
//             const offer = await localPeerConnectionRef.current.createOffer(
//                 offerOptions
//             )
//             console.log('Created local local offer for host')

//             await onCreateOfferSuccess(offer, users)
//         } catch (e) {
//             onCreateSessionDescriptionError(e)
//         }
//         // localPeerConnection.addEventListener('iceconnectionstatechange', e => onIceStateChange(localPeerConnection, e));
//     }

//     async function onCreateOfferSuccess(desc, users) {
//         console.log('setting LocalDescription for host..')
//         try {
//             await localPeerConnectionRef.current.setLocalDescription(desc)
//             console.log(localPeerConnectionRef.current)
//             console.log(`Finished setting LocalDescription for host`)

//             console.log('Attempting to call all users in classroom')
//             users.forEach((user) => createOffer(desc, user))
//         } catch (e) {
//             onSetSessionDescriptionError()
//         }
//     }

//     function createOffer(offer, id) {
//         socketRef.current.emit('make-offer', {
//             offer,
//             to: id,
//         })
//         console.log('making offer to', id)
//     }

//     function error(err) {
//         console.warn('Error', err)
//     }

//     function onSetSessionDescriptionError(error) {
//         console.log(`Failed to set session description: ${error.toString()}`)
//     }

//     function onCreateSessionDescriptionError(error) {
//         console.log(`Failed to create session description: ${error.toString()}`)
//     }

//     async function onIceCandidate(pc, event) {
//         console.log(event)
//         // try {
//         //   await (getOtherPc(pc).addIceCandidate(event.candidate));
//         //   onAddIceCandidateSuccess(pc);
//         // } catch (e) {
//         //   onAddIceCandidateError(pc, e);
//         // }
//     }

//     const handleBroadcasting = () => {
//         if (!isBroadCasting) {
//             // startBroadcast
//             socketRef.current.emit('broadcast_init', true, props.userkid)
//         } else {
//             // stopBroadcast();
//             socketRef.current.emit('broadcast_end', true, props.userkid)
//         }
//         setIsBroadCasting((br) => !br)
//     }

//     return (
//         <div>
//             <LocalVideo ref={localVideo} autoPlay playsInline />

//             <StyledVideo playsInline ref={remoteVideo} autoPlay />

//             <video id="remoteVid" playsInline autoPlay></video>
//             <div>
//                 <button
//                     type="button"
//                     //   onClick={ handleBroadcasting }
//                     className={`audio_switch_button`}>
//                     <i className="fa fa-microphone fa-2x"></i>
//                 </button>
//                 <button
//                     type="button"
//                     onClick={handleBroadcasting}
//                     className={`audio_broadcast_btn-${
//                         isBroadCasting === true ? 'started' : 'ended'
//                     }`}>
//                     <i className="fa fa-broadcast-tower fa-2x"></i>
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Room

import React, { useEffect, useRef } from 'react'
import Peer from 'peerjs'

export default function AudioVideoBroadcast(props) {
    const socketRef = useRef()
    const localVideo = useRef()
    const remoteVideo = useRef()
    const localStream = useRef()
    const PeerId = useRef()
    const usersRef = useRef()
    const isHost = useRef()

    useEffect(() => {
        socketRef.current = props.socket
        usersRef.current = props.users
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

        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id)
            PeerId.current = id
            if (isHost.current) {
                navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: false,
                    })
                    .then((mediaStream) => {
                        const conn = peer.connect(
                            'sNHZJiO54sphP8FZFKp2eP3kdjuEWuiDL4ufGdtl'
                        )

                        localVideo.current.srcObject = mediaStream
                        localStream.current = mediaStream
                        const call = peer.call(
                            'sNHZJiO54sphP8FZFKp2eP3kdjuEWuiDL4ufGdtl',
                            mediaStream
                        )

                        call.on('stream', function (stream) {
                            // `stream` is the MediaStream of the remote peer.
                            // Here you'd add it to an HTML video/canvas element.
                            console.log('got remote stream')

                            remoteVideo.current.srcObject = stream
                            remoteVideo.current.onloadedmetadata = function () {
                                console.log('call has started')
                            }
                        })
                    })
            }
        })

        peer.on('connection', function (conn) {
            console.log('received connection from', conn)
            conn.on('open', function () {
                console.log('connection opened')
            })
        })

        peer.on('call', function (call) {
            // Answer the call, providing our mediaStream
            console.log('someone called', call)

            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: false,
                })
                .then((mediaStream) => {
                    localVideo.current.srcObject = mediaStream

                    call.answer(mediaStream)

                    call.on('stream', (remoteStream) => {
                        console.log('received host stream')
                        // console.log(remoteStream)
                        // remoteVideo.current.srcObject = remoteStream
                        // remoteVideo.current.play()
                        // document.querySelector(
                        //     'video#remoteStream'
                        // ).srcObject = remoteStream
                        const rVid = document.createElement('video')
                        remoteVideo.current.srcObject = remoteStream
                        remoteVideo.current.onloadedmetadata = function () {
                            console.log('call has started')
                        }
                        rVid.srcObject = remoteStream
                        rVid.autoplay = true
                        rVid.playsInline = true
                        rVid.muted = true
                        document
                            .querySelector('#remoteVideosContainer')
                            .appendChild(rVid)
                    })
                })
        })
    }, [])
    return (
        <div>
            <video playsInline autoPlay muted ref={localVideo}></video>
            <video
                playsInline
                autoPlay
                muted
                id="remoteStream"
                ref={remoteVideo}></video>
            <div id="remoteVideosContainer"></div>
        </div>
    )
}
