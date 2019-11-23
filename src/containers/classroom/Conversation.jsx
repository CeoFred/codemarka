import React from 'react';

import './css/conversation.css';

export default function Conversation(props) {
    document.addEventListener('keyup',(e) => {
        if(e.key === 'Enter'){
            props.sendMessage()
        }
    })
    return (
        <div className="conversation__container">
            {/* messages tab */}
        <div className="container bg-black messages">
            <div className="message">
            <span className="message__username">codemon</span>
            <div className="message_content">
                Lorem, ipsum dolor sit amet consectetur
                 adipisicing elit. 
            </div>
            </div>
        </div>

            {/* input text area */}
        <div className="input_container">
        <textarea
        onBlur={props.inputBlur}
        onFocus={props.inputFocused}
         value={props.inputValue}
          onChange={props.handleInputChange} 
          placeholder="Write a message" 
          className="form-control"></textarea>
            </div>  
        </div>
    )
}
