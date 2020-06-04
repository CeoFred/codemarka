/** @format */

import React, { useState, useEffect, useRef } from 'react'

import './index.css'

export default function Audio(props) {
    const [isBroadCasting, setIsBroadCasting] = useState(false)

    const updatedUsers = useRef(props.users)

    useEffect(() => {
        updatedUsers.current = props.users
    }, [props.users])

    var peerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.msRTCPeerConnection

    var sessionDescription =
        window.RTCSessionDescription ||
        window.mozRTCSessionDescription ||
        window.webkitRTCSessionDescription ||
        window.msRTCSessionDescription

    navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia

    var pc = new peerConnection({
        iceServers: [
            {
                url: 'stun:stun.services.mozilla.com',
                username: 'somename',
                credential: 'somecredentials',
            },
        ],
    })

    useEffect(() => {
        props.socket.on('broadcast_status', (status) => {
            if (status) {
                console.log('Requesting local stream')
                props.onAlert('Audio Broadcast Has started')
                // Show local Video
                navigator.mediaDevices
                    .getUserMedia({
                        audio: false,
                        video: true,
                    })
                    .then(gotMedia)
                    .catch((e) => console.log('getUserMedia() error: ', e))
            } else {
                props.onAlert('Failed to start broadcast,try again')
                setIsBroadCasting((br) => !br)
            }
        })

        props.socket.on('broadcast_end_confirmed', (status) => {
            if (status) {
                const localVideo = document.querySelector('video#localVideo')

                localVideo.srcObject = null
                window.localStream = null
                props.onAlert('Audio Broadcast Has Ended')
            }
        })

        props.socket.on('operation_failed', (reason) => {
            props.onAlert(reason)
            setIsBroadCasting((br) => false)
        })

        props.socket.on('offer-made', (data) => {
            if (data.socket !== props.socket.id) {
                // offer = data.offer
                pc.setRemoteDescription(
                    new sessionDescription(data.offer),
                    function () {
                        pc.createAnswer(function (answer) {
                            pc.setLocalDescription(
                                new sessionDescription(answer),
                                function () {
                                    console.log('MAKE ANSWER')
                                    props.socket.emit('make-answer', {
                                        answer: answer,
                                        to: data.socket,
                                    })
                                },
                                error
                            )
                        }, error)
                    },
                    error
                )

                /**
                 * Listen To streams from remote
                 */
                pc.ontrack = function (obj) {
                    var Remotevideo = document.querySelector(
                        'video#remoteVideo'
                    )
                    Remotevideo.srcObject = obj.stream
                    console.log(obj.stream)
                }

                // navigator.getUserMedia(
                //     { video: false, audio: false },
                //     function (stream) {
                //         var Remotevideo = document.querySelector(
                //             'video#remoteVideo'
                //         )
                //         Remotevideo.srcObject = stream
                //         pc.addStream(stream)
                //     },
                //     error
                // )
            }
        })

        props.socket.on('answer-made', function (data) {
            pc.setRemoteDescription(
                new sessionDescription(data.answer),
                function () {},
                error
            )
        })
    }, [])

    /**
     *
     * @param {*} stream
     * @returns string
     */
    function gotMedia(stream) {
        const localVideo = document.querySelector('video#localVideo')

        console.log('Reveived local stream')

        localVideo.srcObject = stream
        window.localStream = stream
        console.log(window.localStream)
        callUsers()
    }

    function callUsers() {
        updatedUsers.current.forEach((user) => createOffer(pc, user))
    }

    function createOffer(pc, user) {
        pc.createOffer(function (offer) {
            pc.setLocalDescription(
                new sessionDescription(offer),
                function () {
                    props.socket.emit('make-offer', {
                        offer: offer,
                        to: user.socketid,
                    })
                },
                error
            )
        }, error)
    }

    const handleBroadcast = () => {
        if (!isBroadCasting) {
            // startBroadcast
            props.socket.emit('broadcast_init', true, props.userkid)
        } else {
            // stopBroadcast();
            props.socket.emit('broadcast_end', true, props.userkid)
        }

        setIsBroadCasting((br) => !br)
    }

    function error(err) {
        console.warn('Error', err)
    }

    return (
        <div>
            <a id="download" className="d-none">
                Download
            </a>
            <video
                id="localVideo"
                draggable
                playsInline={true}
                autoPlay={true}
                muted
                className={`local_video`}></video>
            <video
                id="remoteVideo"
                draggable
                playsInline={true}
                autoPlay={true}
                muted
                className={`remote_video`}></video>
            <button
                type="button"
                //   onClick={ handleBroadcast }
                className={`audio_switch_button`}>
                <i className="fa fa-microphone fa-2x"></i>
            </button>
            <button
                type="button"
                onClick={handleBroadcast}
                className={`audio_broadcast_btn-${
                    isBroadCasting === true ? 'started' : 'ended'
                }`}>
                <i className="fa fa-broadcast-tower fa-2x"></i>
            </button>
        </div>
    )
}
