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
   } else if(m.by === 'server' && m.type === 'oldMsgUpdate'){
      return(
        <div className={`message ${m.by === props.user ? 'sent' : 'received'}`} key={m.msgId} id={m.msgId}>
       {m.msg}      
                  <span class="metadata">
                      <span class="time">{m.timeSent}</span>
                      {m.by === props.user ?
                      <span class="tick">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076">
                          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"></path>
                          </svg></span>
: ''}

                  </span>          
    </div>
      )
   }
   
   else {
    return (
      <div className={`message ${m.by === props.user ? 'sent' : 'received'}`} key={m.msgId} id={m.msgId}>
          {m.msg}
       
        <span class="metadata">
                 <span class="time">{m.timeSent}</span>
                     
               {m.by === props.user ?  <span class="tick">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076">
                          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"></path>
                          </svg>
                          </span>
: ''}
                  </span>
    </div>


     )
   }
      
 })
 
  return (
    <div className="conversation__container d-block">
     <div className="user-bar">
               
    <span class="name">
       
                  <span>Zeno Rocha</span>
                </span>
      <span className="float-right">
        <i className="fa fa-dot-circle-o"></i>
      </span>
     </div>
      {/* messages tab */}
      <div className="container bg-black messages">
      
      {messages}
      </div>

      {/* input text area */}
      <div className="input_container">
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
