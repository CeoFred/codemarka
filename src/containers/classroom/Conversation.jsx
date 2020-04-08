/* eslint-disable react/prop-types */
import React from 'react';
import { formatToTimeZone } from 'date-fns-timezone';
import ChatComponent from "./components/more_options_menu.jsx";

import './css/conversation.css';
import MoreOptions from './components/more_options.jsx';
import ContextWrapper from './components/active_components_state_context.jsx';
import { Picker } from 'emoji-mart';
import EmojiModal from './components/emoji_modal.jsx';

const BotMessage = ({ m, time }) => {
    return (
        <div className="message received" key={m.msgId} id={m.msgId}>
            <div style={{ color: '#ED7BCA' }} className="font-weight-800">
                MARKA-BOT{' '}
                <br />
                <small style={{ color: '#000' }}>
                    (visible to only you)
                </small>
            </div>
            <p className="pt-3">
                Hello {m.name}, need help navigating ? just type --bot and i'll be glad to help. Enjoy
            your session.
            </p>
        </div>
    )
}

export default function Conversation(props) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const inputKeyDown = (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            props.sendMessage(event);
        }
    }
    let messages;
    //  let lastIndex;
    if (props.messages && props.messages.length > 0) {

        messages = props.messages.map((m, i) => {

            const date = new Date(m.oTime)
            const time = formatToTimeZone(date, 'h:mm a', { timeZone })

            if (m.by.toLowerCase() === 'server' && m.type) {
                if (m.for === props.user) {
                    return (
                        <div>
                            <div className="message_extra" key={m.msgId} id={m.msgId}>
                                You
                                {m.type === 'sLeft' ? ' left' : ' Joined'}
                            </div>
                            <div>
                                {
                                    m.type === 'sLeft' ? '' : <BotMessage m={m} time={time} />
                                }
                            </div>
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
                        key={m.msgId}
                        id={m.msgId}>
                        <div
                            style={{ color: `${m.color ? m.color : 'white'}` }}
                            className="font-weight-800">
                            {m.by !== props.user
                                ? m.name +
                                `${props.owner === m.by ? '(Admin)' : ''}`
                                : ''}
                        </div>
                        {m.msg}
                        <span className="metadata">
                            <span className="time">{time}</span>
                        </span>
                    </div>
                )
            } else {
                return (
                    <div
                        className={`message ${
                            m.by === props.user ? 'sent' : 'received'
                            }`}
                        key={m.msgId}
                        id={m.msgId}>
                        <div
                            style={{ color: `${m.color ? m.color : 'white'}` }}
                            className="font-weight-800">
                            {m.by !== props.user
                                ? m.name +
                                `${props.owner === m.by ? '(Admin)' : ''}`
                                : ''}
                        </div>
                        {m.msg}
                        <span className="metadata">
                            <span className="time">{time}</span>
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
                    return (<span className="m-auto">{whoIsTypingArray[0].username} is typing...</span>)
                } else if (usersTyping === 2) {
                    return (
                        <span className="m-auto">
                            {whoIsTypingArray[0].username} and{' '}
                            {whoIsTypingArray[1].username} are typing ...
                        </span>
                    )
                }
            } else {
                return '';
            }
        }
    }


    /**
     * True designates open, false designates close.
     * This object controls the state of the components
     * Like the more options menu
     * 
     */

    return (
        <ContextWrapper>
            <div className="conversation__container d-block">
                <div className="user-bar">

                    <span className="name">

                        <span>{props.username}</span>
                    </span>
                    <div className="font-italic text-justify text-white" style={{ fontSize: 10 }}>
                        {getTyping()}
                    </div>
                </div>
                {/* messages tab */}
                <div className="container bg-black messages">

                    {messages}
                </div>

                <EmojiModal>
                    <Picker onClick = {(emoji, event) => {props.collectEmoji(emoji.native)}} title='Pick your emoji…' emoji='point_up'/>
                </EmojiModal>


                <MoreOptions />
                {/* input text area */}

                <div className="message-container">
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
                            style={{ borderRadius: '15px' }}
                        ></textarea>
                    </div>
                    <ChatComponent />
                </div>
            </div>
        </ContextWrapper>
    );
}
