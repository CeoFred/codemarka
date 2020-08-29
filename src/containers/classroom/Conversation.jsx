/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React, { useRef } from 'react'
import { formatToTimeZone } from 'date-fns-timezone'
import Mentions from '../../components/classroom/Conversation_Partials/Mentions/index'

import './css/conversation.css'

export default function Conversation(props) {
    const messageRef = useRef(null)

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    var wrapURLs = function (text, new_window, id) {
        var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gm
        let hasHTML = false
        let tabFound = text.replace('\t', '')
        let newLine = tabFound.replace('\n', '')
        text = newLine
        const htmlRegex = /<.+?>/g

        let rt = text.replace(htmlRegex, function (username) {
            hasHTML = true
            return username
        })

        if (hasHTML) {
            return <code>{rt}</code>
        }

        // var emailRegex = /[\w|.]+[@]+\w+[.]+[\w|.]*$/gm;
        var target = new_window === true || new_window == null ? '_blank' : ''
        // var oldRegez = /^(http?|https?):\/\/[^\s$.?#"].[^\s]*$/gm;
        rt = rt.replace(url_pattern, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i
            var href = protocol_pattern.test(url) ? url : 'http://' + url

            return `<a href="${href}" target="${target}"> ${url} </a>`
        })
        const mentionReqex = /@+[\w]*/gm

        rt = rt.replace(mentionReqex, function (username) {
            const userFound = props.users.filter((user) => {
                return (
                    String(`@${user.username.trim()}`) ===
                    String(username.trim())
                )
            })
            if (userFound.length) {
                return `<b><a style="color:gold;cursor:pointer" href="/u/${userFound[0].username}" class="mentions_username"> ${username}</a>
             <div class="mentions_username_profile">
                <div class="card shadow-none">
    <div class="p-3 d-flex" style="align-items:center">
                  <a href="#" class="avatar rounded-circle hover-scale-105">
    <img alt="Image placeholder" src="${userFound[0].avatar}" class="">

</a>
        <div>
            <span class="h6">${userFound[0].username}</span>
         
        </div>
    </div>
</div>
             </div>
             </b>`
            } else return username
        })

        return (
            <div
                className="r-message"
                dangerouslySetInnerHTML={{ __html: rt }}
            />
        )
    }

    const inputKeyDown = (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault()
            props.sendMessage(event)
        }
    }

    if (props.messages && props.messages.length > 0) {
        messageRef.current = props.messages.map((m, i) => {
           
            const date = new Date(m.oTime)
            const time = formatToTimeZone(date, 'h:mm a', { timeZone })

            // let prevMessage = m[i] - 1;
            // let nextMessage = m[i] + 1;

            // prevMessage = prevMessage ? prevMessage : null;
            // nextMessage = nextMessage ? nextMessage : null;

            // const previousMessageIsFromUser = prevMessage && prevMessage.by !== "server";
            // const nextMessageIsFromUser = nextMessage && nextMessage.by !== "server";

            // const equalTimeStampWithPreviousMessage = String(prevMessage.time)

            const stylesObj = {
                self: { border: `0px` },
                others: {
                    borderRight: `5px solid ${m.color ? m.color : 'white'}`,
                },
            }
            const style =
                String(props.user) === String(m.by)
                    ? stylesObj.self
                    : stylesObj.others

            if (m.by.toLowerCase() === 'server' && m.type) {
                if (m.for === props.user) {
                    return (
                        <div
                            className="message_extra"
                            key={m.msgId}
                            id={m.msgId}>
                            You
                            {m.type === 'sLeft' ? ' left' : ' Joined'}
                        </div>
                    )
                }
                return (
                    <div className="message_extra" key={m.msgId} id={m.msgId}>
                        {m.name}
                        {m.type === 'sLeft' ? ' left' : ' Joined'}
                    </div>
                )
            } else if (m.by === 'server' && m.type === 'oldMsgUpdate') {
                return (
                    <div
                        className={`message ${
                            m.by === props.user ? 'sent' : 'received'
                        }`}
                        key={m.msgId.toString()}
                        id={m.msgId}
                        style={style}>
                        <div
                            style={{ color: `${m.color ? m.color : 'white'}` }}
                            className="font-weight-800 user-by">
                            {m.by !== props.user
                                ? m.name +
                                  `${props.owner === m.by ? '(admin)' : ''}`
                                : ''}
                        </div>
                        {m.type == 'image' ? (
                            <div>
                                <img
                                    src={m.result.secure_url}
                                    style={{ width: '100%', cursor: 'pointer' }}
                                    onClick={(e) =>
                                        props.handleImagePreview(
                                            e,
                                            m.result.secure_url
                                        )
                                    }
                                />
                            </div>
                        ) : (
                            wrapURLs(String(m.msg), true, m.msgId)
                        )}

                        <span className="metadata">
                            <b className="time">{time}</b>
                        </span>
                    </div>
                )
            } else {
                return (
                    <div
                        className={`message ${
                            m.by === props.user ? 'sent' : 'received'
                        }`}
                        key={m.msgId.toString()}
                        style={style}
                        id={m.msgId}>
                        <div
                            style={{ color: `${m.color ? m.color : 'white'}` }}
                            className="font-weight-800 user-by">
                            {m.by !== props.user ? m.name : ''}
                        </div>
                        {m.type == 'image' ? (
                            <div>
                                <img
                                    src={m.result.secure_url}
                                    alt={m.result.public_id}
                                    style={{ width: '100%',cursor:'pointer' }}
                                    onClick={(e) =>
                                        props.handleImagePreview(
                                            e,
                                            m.result.secure_url
                                        )
                                    }
                                />
                            </div>
                        ) : (
                            wrapURLs(String(m.msg), true, m.msgId)
                        )}
                        <span className="metadata">
                            <b className="time">{time}</b>
                        </span>
                    </div>
                )
            }
        })
    }

    const getTyping = () => {
        const whoIsTypingArray = props.typing.filter((utypist) => {
            return utypist.id !== props.user
        })

        if (Array.isArray(whoIsTypingArray)) {
            const usersTyping = whoIsTypingArray.length

            if (usersTyping > 0) {
                if (usersTyping === 1) {
                    return (
                        <span className="m-auto">
                            {whoIsTypingArray[0].username.slice(0, 10)} is
                            typing...
                        </span>
                    )
                } else if (usersTyping === 2) {
                    return (
                        <span className="m-auto">
                            {whoIsTypingArray[0].username.slice(0, 10)} and{' '}
                            {whoIsTypingArray[1].username.slice(0, 10)} are
                            typing
                        </span>
                    )
                } else if (usersTyping > 2) {
                    return (
                        <span className="m-auto">Several hands typing...</span>
                    )
                }
            } else {
                return ''
            }
        }
    }

    return (
        <div className="conversation__container d-block">
            <div className="user-bar">
                <span className="name">
                    <div>
                        {props.username.slice(0, 20)}
                        {props.username.length > 19 ? '...' : ''}
                    </div>
                    <div
                        style={{
                            marginTop: '-10px',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 200,
                        }}>
                        {props.isOnline ? 'online' : 'offline'}{' '}
                        <span
                            className={`dot-${
                                props.isOnline ? 'online' : 'offline'
                            }`}></span>
                    </div>
                    <div className="text-white" style={{ fontSize: 10 }}>
                        {getTyping()}
                    </div>
                </span>
            </div>
            {/* messages tab */}
            <div className="container bg-black messages" id="fala">
                {messageRef.current}
            </div>

            <Mentions
                users={props.users}
                userSelected={props.userSelected}
                mentionSearchString={props.mentionSearchString}
                shouldDisplay={props.shouldDisplay}
            />

            {/* input text area */}
            <div className="input_container bg-dark">
                <textarea
                    style={{ fontSize: 'small', padding: '.5rem .25rem' }}
                    resize="none"
                    id="input_area"
                    onBlur={props.inputBlur}
                    onFocus={props.inputFocused}
                    value={props.inputValue}
                    onChange={props.handleInputChange}
                    onKeyDown={inputKeyDown}
                    placeholder="Write a message"
                    className="form-control"></textarea>
                <div className="action-container">
                    <span onClick={props.showMentions}>
                        <i className="fa fa-at"></i>
                    </span>
                    <span onClick={props.showEmojiPicker}>
                        <i className="fa fa-smile"></i>
                    </span>
                    {/* <span onClick={props.addCodeBlock}>
                        <i className="fa fa-code"></i>
                    </span> */}
                    <span onClick={props.uploadImage}>
                        <i className="fa fa-image"></i>
                    </span>
                    {/* <span onClick={props.uploadFiles}>
                        <i className="fa fa-file-alt"></i>
                    </span>
                    <span onClick={props.addURL}>
                        <i className="fa fa-paperclip"></i>
                    </span> */}
                </div>
            </div>
        </div>
    )
}
