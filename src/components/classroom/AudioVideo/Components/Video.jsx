import React, { useRef, useLayoutEffect, useState } from 'react'

export default function RemoteVideoStream({
    takePhoto,
    stream,
    wave,
    toogleAudio,
    disconnectUser,
    video,
    audio,
    user,
    isOwner,
}) {
    const userVideo = useRef(null)
    const [username_, setusername_] = useState('loading..')

    useLayoutEffect(() => {
        userVideo.current.srcObject = stream

        const name = (user && user.username) || 'loading..'
        setusername_(name)
    }, [stream, user])

    return (
        <div className={ `video-container ${ audio ? 'user-unmuted' : 'user-muted' }` }>
            <span className="user_name_label">{username_ || 'loading...'}</span>
            <video
                style={ { display: video ? 'flex' : 'none' } }
                className={ `stream-${ user.kid }` }
                playsInline
                muted={ false }
                ref={ userVideo }
                autoPlay
            />
            <div
                style={ { display: !video ? 'flex' : 'none' } }
                className="userVideo-placecholder">
                <img src={ user.avatar } height="60" width="60" />
            </div>

            <div className="video-audio-controls">
                {isOwner && (
                    <React.Fragment>
                        <span
                            className="video-audio-icon-button"
                            title="disconnect"
                            onClick={ () => disconnectUser(user) }>
                            <i className="fa fa-ban cursor-pointer"></i>
                        </span>
                        <span
                            className="video-audio-icon-button"
                            title="Toogle User Audio"
                            onClick={ () => toogleAudio(user) }>
                            <i className={ `fa fa-microphone${ !audio ? '-slash' : ' ' } cursor-pointer` }></i>
                        </span>
                    </React.Fragment>
                )}{' '}
                <span
                    className="video-audio-icon-button"
                    title="wave at user"
                    onClick={ () => wave(user) }>
                    <i className={ 'fa fa-hand-paper cursor-pointer' }></i>
                </span>
                <span
                    className="video-audio-icon-button"
                    title="take photo"
                    onClick={ () => takePhoto(user) }>
                    <i className="fa fa-camera-retro cursor-pointer"></i>
                </span>
            </div>
        </div>
    )
}
