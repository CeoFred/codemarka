import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Input from "../../../components/UI/Input.jsx";
import Button from "../../../components/UI/Button.jsx";
import Message from  './Messages/MessageTest';
import "../../../components/styles/login.css";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {

      messages:[],
      users:[],
      user_message:'',
      last_sent_message:{value:''},
      has_sent_message:false,
      user_id:Math.random(),
      connection_id:null,
      classroom_id:null
    
    }
  }

   /**
   * Button click controller
   */
  sendMessageAction = e => {
    
    e.preventDefault();
   const user_message = this.state.user_message
   if((user_message.trim()).length <= 0) return

   var data
      data  =  {
        message:this.state.last_sent_message,
        user_id:this.state.user_id,
        time:new Date().getTime(),
        type:'classroom_message',
        classroom_id:this.state.classroom_id
      }

      client.send(JSON.stringify(data))

   
   let oldState = {...this.state}
   oldState['last_sent_message']['value'] = user_message
   oldState['has_sent_message'] = false
   oldState['user_message'] = ''
   const newState  = oldState
   
    this.setState(newState, () => {
      //send message to the server
      console.log(this.state)
    });

  };

  /**
   * Input change handlers
   */
  inputChangedHandler = (e) => {
    e.preventDefault();
    let oldState = { ...this.state };
    oldState['last_sent_message']['value'] =  e.target.value
    oldState['user_message'] = e.target.value
    let newState = oldState;
    this.setState(newState);
  };


/* When content changes, we send the
current content of the editor to the server. */
onEditorStateChange = (text) => {
  client.send(JSON.stringify({
    type: "contentchange",
    username: this.state.username,
    content: text
  }));
 };

 componentDidMount() {
   let url = new URLSearchParams(window.location.search)
   const classroom =  url.get('classroom')
   
   this.setState({classroom_id:classroom})

  client.onopen = () => {
   console.log('WebSocket Client Connected');

   client.send(JSON.stringify({
    type:'client_manifest',
    value:{
      user_id:this.state.user_id,
      classroom_id:this.state.classroom_id
    }
  }))

  };


  
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data)
    const messageType = dataFromServer.type
    const contentArray = dataFromServer.value


    if(messageType === 'allMessages'){
      this.setState({messages:contentArray},() => {
        console.log(this.state)
      })

    }else if(messageType === 'new_classroom_message'){
      
    let oldMsg =    this.state.messages;

    oldMsg.push(contentArray)

      this.setState({messages:oldMsg})
    
    }
    else if(messageType === 'connection_manifest'){
      //set connection id
      this.setState({connection_id:contentArray})
    }
    else if(messageType === 'user_left' || messageType === 'user_joined'){
    let whoLeft = contentArray === this.state.user_id ?  'You' :  contentArray
    let oldMsg =    this.state.messages;
    let action = messageType === 'user_left' ? 'left' : 'joined'
    
    oldMsg.push({message:whoLeft +' '+ action,by:'server'})

    this.setState({messages:oldMsg})
    }
  };

}

  
  render() {
    let stateMessages = this.state.messages
    let messages;
    if(stateMessages.length <= 0) messages = 'Loading..'
    messages =   stateMessages.map((ele) => {
      return <Message content={ele.message} self={this.state.user_id} from={ele.by} key={Math.random() * new Date().getTime()}/>
   })
    return (
      <div>

          {messages}
              <Input
                inputChanged={this.inputChangedHandler}
                value={this.state.user_message}
                type="text"
                name="message"
                placeholder="Send a message ..."
                required
              />
                <Button type="buttton" submit={this.sendMessageAction}>
                  Send
                </Button>
            
        </div>
    );
  }
}

export default Chat;