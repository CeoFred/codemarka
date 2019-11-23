import React from 'react';

import './css/conversation.css';

export default function Conversation() {
    return (
        <div className="conversation__container">
            <div>
            <textarea>

            </textarea>
            <button className="send_button">
            <i className="fa fa-arrow-right"></i>
            </button>
            </div>
        </div>
    )
}
