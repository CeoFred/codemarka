import React from 'react';
import Message from '../../containers/classroom/Chat/Messages/MessageTest'    
import Fab from '@material-ui/core/Fab';
import ArrowRightAltRounded from '@material-ui/icons/ArrowRightAltRounded'
import List from '@material-ui/core/List';


export default function TestMessages(props) {
  let stateMessages = props.messages
  let messages;
  if(stateMessages.length <= 0) messages = 'Loading..'
  messages =   stateMessages.map((ele) => {
    return <Message content={ele.message} self={props.user_id} from={ele.by} key={Math.random() * new Date().getTime()}/>
 })

  return (
    <div style={{positon:'relative',height:'80vh'}}>
      <List>
      {messages}
      </List>
    <div style={{position:'absolute',bottom:0,paddigLeft:10}}>
    <Input textInputValue={props.textInputValue} messageBtnClicked={props.messageBtnClicked} messageChange={props.messageChange}/>
    </div>
    </div>
  );
}


function Input(props){
  return(
    <>
    <textarea value={props.textInputValue} onChange={props.messageChange} placeholder="Type a message..." rows="1"></textarea>
    <Fab onClick={props.messageBtnClicked}>
        <ArrowRightAltRounded/>
        </Fab>
    </>
  )
}