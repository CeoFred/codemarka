import React from "react";

import "./css/conversation.css";

export default function Conversation(props) {
 const inputKeyDown = (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        props.sendMessage(event);
      }
 }

 let messages = props.messages.map(m => {
   if((m.by).toLowerCase() === 'server' && m.type === 'sJoin'){
     if(m.for === props.user){
       return (
         
       <div>
       <span className="message__username text-info">You Joined</span>
        </div>
       )
     }
     return (
       <div>
      <span className="message__username text-info">{m.name} Joined</span>
       </div>
     )
   } else if(m.by === 'server' && m.type === 'oldMsgUpdate'){
     console.log('oldmessages',m);
      return(
        <div className="message" key={m.by}>
      <span className="message__username text-highlight-primary">{m.by === props.user ? 'You' : m.name}</span>
     <div className="message_content">{m.msg}</div>
    </div>
      )
   }
   
   else {
    return (
      <div className="message" key={m.by}>
      <span className="message__username text-highlight-primary">{m.by === props.user ? 'You' : m.name}</span>
     <div className="message_content">{m.msg}</div>
    </div>
     )
   }   
 })
  return (
    <div className="conversation__container">
      {/* messages tab */}
      <div className="container bg-black messages">
      {messages}
      </div>

      {/* input text area */}
      <div className="input_container">
        <textarea
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
