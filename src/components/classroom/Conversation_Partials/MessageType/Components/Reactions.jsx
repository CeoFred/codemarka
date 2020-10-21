/** @format */

import React, { useState, useEffect } from 'react'

export default function Reactions(props) {
    const { subscribers, thread } = props.message

    const [threadCount, setThreadCount] = useState(1)

    useEffect(() => {
        setThreadCount(props.thread.length ? props.thread.length : 1)
        props.socket.on('new_message_reaction', (thread) => {
            if (thread[0].messageId === props.msgId) {
                setThreadCount(thread.length)
            }
        })
    }, [])

    return (
        <div className="message__reply_bar">
            {subscribers.map((subscriber, i) => {
                if (i <= 4) {
                    return (
                        <div className="thread_message_reply_user_image">
                            <img
                                height="24"
                                width="24"
                                role="img"
                                src={ subscriber.image }
                            />
                        </div>
                    )
                }
            })}
            <a className="thread_link" onClick={ props.showThread }>
                {threadCount} {threadCount <= 1 ? 'reply' : 'replies'}
            </a>
            <div class="c-message__reply_bar_description">
                <span class="c-message__reply_bar_last_reply"></span>
            </div>
        </div>
    )
}
