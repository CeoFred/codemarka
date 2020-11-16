import React, { useRef, useLayoutEffect, useState } from 'react'

export default function RemoteVideoStream({ stream, hideVideo, video,user,isOwner }) {
    const userVideo = useRef(null)
    const [username_, setusername_] = useState('loading..')

    useLayoutEffect(() => {
        userVideo.current.srcObject = stream
        
            const name = user && user.username || 'loading..'
            setusername_(name)
            
    }, [stream, user])

    return (
        <div className="video-container">
            <span className="user_name_label">{username_ || 'loading...'}</span>
            <video
                className={ `userVideo stream-${ user.kid }` }
                playsInline
                muted={ false }
                ref={ userVideo }
                autoPlay
            />
            {/* <div >
                <img src={ user.avatar } height="40" width="40"/>
            </div> */}
            {isOwner && (
                <div className="video-audio-controls">
                    <span
                        className="video-audio-icon-button"
                        onClick={ () => hideVideo(user.kid) }>
                        <i
                            className={ `fa fa-video${
                                video ? '-slash' : ''
                            } cursor-pointer` }></i>
                    </span>
                    <span className="video-audio-icon-button">
                        <i className="fa fa-microphone-slash cursor-pointer"></i>
                    </span>
                </div>
            )}
        </div>
    )
}
