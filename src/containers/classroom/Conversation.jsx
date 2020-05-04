/* eslint-disable react/prop-types */
import React,{ useEffect, useRef } from 'react';
import { formatToTimeZone } from 'date-fns-timezone';

import './css/conversation.css';

export default function Conversation(props) {
    const messageRef = useRef(null);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    useEffect(() => {
        // document.getElementById("fala").innerHTML = 'text';
    })
    var wrapURLs = function (text, new_window, id) {
        // var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gm;
       
        var target = (new_window === true || new_window == null) ? '_blank' : '';

        const rt = text.replace(/^(http?|https?):\/\/[^\s$.?#"].[^\s]*$/gm, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
            var href = protocol_pattern.test(url) ? url : 'http://' + url;

            return `<a href="${href}" target="${target}"> ${url} </a>`;
        });
        return (<div className="r-message" dangerouslySetInnerHTML={{ __html: rt }} />);
    };


    const inputKeyDown = (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            props.sendMessage(event);
        }
    }

    if (props.messages && props.messages.length > 0) {

        messageRef.current = props.messages.map((m, i) => {

            const date = new Date(m.oTime)
            const time = formatToTimeZone(date, 'h:mm a', { timeZone })

            if (m.by.toLowerCase() === 'server' && m.type) {
                if (m.for === props.user) {
                    return (
                            <div className="message_extra" key={m.msgId} id={m.msgId}>
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
                        style={{ borderLeft: `2px solid ${m.color ? m.color : 'white'}` }}
                        >
                        <div
                            style={{ color: `${m.color ? m.color : 'white'}` }}
                            className="font-weight-800 user-by">
                            {m.by !== props.user
                                ? m.name +
                                `${props.owner === m.by ? '(admin)' : ''}`
                                : ''}
                        </div>
                        {wrapURLs(String(m.msg), true, m.msgId)}
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

                        style={{ borderLeft: `2px solid ${m.color ? m.color : 'white'}` }}
                        id={m.msgId}>
                        <div
                            style={{ color: `${m.color ? m.color : 'white'}` }}
                            className="font-weight-800 user-by">
                            {m.by !== props.user
                                ? m.name +
                                `${props.owner === m.by ? '(admin)' : ''}`
                                : ''}
                        </div>
                        {wrapURLs(m.msg, true, m.msgId)}
                        <span className="metadata">
                            <b className="time">{time}</b>
                        </span>
                    </div>
                )
            }
        })
    }


    const getTyping = () => {

        const whoIsTypingArray = props.typing.filter(utypist => {
            return utypist.id !== props.user
        });

        if (Array.isArray(whoIsTypingArray)) {

            const usersTyping = whoIsTypingArray.length;

            if (usersTyping > 0) {
                if (usersTyping === 1) {
                    return (<span className="m-auto">{whoIsTypingArray[0].username.slice(0, 10)} is typing...</span>)
                } else if (usersTyping === 2) {
                    return (
                        <span className="m-auto">
                            {whoIsTypingArray[0].username.slice(0, 10)} and{' '}
                            {whoIsTypingArray[1].username.slice(0, 10)} are typing
                        </span>
                    )
                }
            } else {
                return '';
            }
        }
    }

    return (
        <div className="conversation__container d-block">
            <div className="user-bar">

                <span className="name">
    <div>{props.username.slice(0,20)}{props.username.length > 19 ? '...' : ''}</div>
                    <div style={{
                        marginTop: '-10px', 
                        color: '#fff',
                        fontSize: '1rem',
                        fontWeight: 200}}>{props.isOnline ? 'online' : 'offline'} <span className={`dot-${props.isOnline ? 'online' : 'offline'}`}></span>
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

            {/* input text area */}
            <div className="input_container bg-dark">
                <textarea

                    resize="none"
                    id="input_area"
                    onBlur={props.inputBlur}
                    onFocus={props.inputFocused}
                    value={props.inputValue}
                    onChange={props.handleInputChange}
                    onKeyDown={inputKeyDown}
                    placeholder="Write a message"
                    className="form-control"
                ></textarea>
            </div>
        </div>
    );
}
