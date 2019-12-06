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
 
//  let lastIndex;

 

 let messages = props.messages.map((m,i) => {
   if((m.by).toLowerCase() === 'server' && m.type ){
     if(m.for === props.user){
       return (
         
       <div key={m.msgId} id={m.msgId}>
     <span className="message__username text-info">You
      {m.type === 'sLeft' ? ' left' : ' Joined'}</span>
        </div>
       )
     }
     return (
       <div key={m.msgId} id={m.msgId}>
      <span className="message__username text-info">{m.name}
       {m.type === 'sLeft' ? ' left' : ' Joined'}</span>
       </div>
     )
   } else if(m.by === 'server' && m.type === 'oldMsgUpdate'){
      return(
        <div className="message" key={m.msgId} id={m.msgId}>
      <span className="message__username text-highlight-primary">{m.by === props.user ? 'You' : m.name}</span>
      <span className="float-right text-neutral text-sm">{m.timeSent}</span>

     <div className="message_content">{m.msg}</div>
    </div>
      )
   }
   
   else {
    return (
      <div className="message" key={m.msgId} id={m.msgId}>
      <span className="message__username text-highlight-primary">{m.by === props.user ? 'You' : m.name}</span>
          <span className="float-right text-neutral text-sm">{m.timeSent}</span>
   
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
