import React,{ useRef, useLayoutEffect } from 'react'

export default function RemoteVideoStream({ stream, hideVideo, video,usersSocketID }) {
    const userVideo = useRef(null)

    useLayoutEffect(() => {
        userVideo.current.srcObject = stream
        console.log(stream)
    }, [])
    return (
        <div className="video-container">
            <video
                className={ `userVideo stream-${ usersSocketID }` }
                playsInline
                muted={ false }
                ref={ userVideo }
                autoPlay
            />
            <div className="video-audio-controls">
                <span
                    className="video-audio-icon-button"
                    onClick={ () => hideVideo(usersSocketID) }>
                    <i
                        className={ `fa fa-video${
                            video ? '-slash' : ''
                        } cursor-pointer` }></i>
                </span>
                <span className="video-audio-icon-button">
                    <i className="fa fa-microphone-slash cursor-pointer"></i>
                </span>
            </div>
        </div>
    )
}
