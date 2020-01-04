import React from 'react';
import { formatToTimeZone } from 'date-fns-timezone';

import './css/conversation.css';

export default function Conversation(props) {
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

 const inputKeyDown = (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        props.sendMessage(event);
      }
 }
 
//  let lastIndex;

 const messages = props.messages.map((m,i) => {
     const date = new Date(m.oTime);   
     const time = formatToTimeZone(date,'h:mm a',{timeZone});

   if((m.by).toLowerCase() === 'server' && m.type ){
     if(m.for === props.user){
       return (
         
           <div className="message_extra" key={ m.msgId } id={ m.msgId }>
     You
               {m.type === 'sLeft' ? ' left' : ' Joined'}
           </div>
       )
     }
     return (
         <div className="message_extra" key={ m.msgId } id={ m.msgId }>
             {m.name}
             {m.type === 'sLeft' ? ' left' : ' Joined'}
         </div>
     )
   } else if(m.by === 'server' && m.type === 'oldMsgUpdate'){
      return (
          <div
              className={ `message ${ m.by === props.user ? 'sent' : 'received' }` }
              key={ m.msgId }
              id={ m.msgId }>
              <div
                  style={ { color: `${ m.color ? m.color : 'white' }` } }
                  className="font-weight-800">
                  {m.by !== props.user
                      ? m.name + `${ props.owner === m.by ? '(Admin)' : '' }`
                      : ''}
              </div>
              {m.msg}
              <span class="metadata">
                  <span class="time">{time}</span>
                  {m.by === props.user ? (
                      <span class="tick">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="15"
                              id="msg-dblcheck-ack"
                              x="2063"
                              y="2076">
                              <path
                                  d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                  fill="#4fc3f7"></path>
                          </svg>
                      </span>
                  ) : (
                      ''
                  )}
              </span>
          </div>
      )
   }
   
   else {
    return (
        <div
            className={ `message ${ m.by === props.user ? 'sent' : 'received' }` }
            key={ m.msgId }
            id={ m.msgId }>
            <div
                style={ { color: `${ m.color ? m.color : 'white' }` } }
                className="font-weight-800">
                {m.by !== props.user
                    ? m.name + `${ props.owner === m.by ? '(Admin)' : '' }`
                    : ''}
            </div>
            {m.msg}
            <span class="metadata">
                <span class="time">{time}</span>

                {m.by === props.user ? (
                    <span class="tick">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="15"
                            id="msg-dblcheck-ack"
                            x="2063"
                            y="2076">
                            <path
                                d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                fill="#4fc3f7"></path>
                        </svg>
                    </span>
                ) : (
                    ''
                )}
            </span>
        </div>
    )
   }
      
 })

 const getTyping = () => {

   const whoIsTypingArray = props.typing.filter(utypist => {
     return utypist.id !== props.user
   });

   if(Array.isArray(whoIsTypingArray)){

     const usersTyping = whoIsTypingArray.length;
     
     if(usersTyping > 0){
       if(usersTyping === 1){
          return (<span>{whoIsTypingArray[ 0 ].username} is typing...</span>)
        } else if(usersTyping === 2){
          return (<span>{whoIsTypingArray[ 0 ].username} and {whoIsTypingArray[ 1 ].username} are typing</span>)
       } else if (usersTyping === 3){
          return (<span>{whoIsTypingArray[ 0 ].username},{whoIsTypingArray[ 1 ].username} and {whoIsTypingArray[ 2 ].username} are typing</span>)

       }
     } else {
       return '';
     }
   }
 }
 
  return (
      <div className="conversation__container d-block">
          <div className="user-bar">
               
              <span class="name">
       
                  <span>{ props.username }</span>
              </span>
              <div className="font-italic text-justify text-white" style={ { fontSize:10 } }>
                  {getTyping()}
              </div>
          </div>
          {/* messages tab */}
          <div className="container bg-black messages">
      
              {messages}
          </div>

          {/* input text area */}
          <div className="input_container bg-dark">
              <textarea

          resize="none"
          id="input_area"
          onBlur={ props.inputBlur }
          onFocus={ props.inputFocused }
          value={ props.inputValue }
          onChange={ props.handleInputChange }
          onKeyDown={ inputKeyDown }
          placeholder="Write a message"
          className="form-control"
          style={ { borderRadius:'15px' } }
        ></textarea>
          </div>
      </div>
  );
}
