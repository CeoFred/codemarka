import React from "react";
import "../../containers/classroom/Editor/editor.css";
import {useSelector,useDispatch} from 'react-redux'
import * as action from '../../redux/actions/index.jsx';

import io from 'socket.io-client';
const socket = io('http://localhost:8000/classroom');


export default function FullWidthGrid() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const user = state.auth;
  const [messageCount, setMessageCount] = React.useState(0);
  const [theme, setTheme] = React.useState('dark');
  const [inRoom, setInRoom] = React.useState(null);

  const [colabstate, setColabState] = React.useState({
    messages: [],
    users: [],
    user_message: "",
    last_sent_message: { value: "" },
    has_sent_message: false,
    user_id: user.userId,
    classroom_id: null,
    javascript_editor_content: "",
    html_editor_content: "",
    css_editor_content: "",
    username: user.username,
    theme,
    landed:true
  });

  // runs for every re-render and initial render
  React.useEffect(() => {
      window.document.title = 'Join A classroom'
    })
  
    React.useEffect(() => {
      const button = document.getElementById('user_class_state');
      button.addEventListener("click", handleInRoom);
      return function removeListener(){
        button.removeEventListener('click',handleInRoom)
      }
    })

    // for first render - the return is not called
    // if inRoom is changed, leaveRoom is called for a clean up
    // and our effect is run
  React.useEffect(() => {    
      if(inRoom){
        socket.emit('join',{room:'23456'})
        dispatch(action.userJoinedAClass(23456))
      }
      return function leaveRoom(){
        if(inRoom){
        console.log('Leaving room')
        socket.emit('leave',{room:'23456'})
        dispatch(action.userLeftAClass(23456))

        }
      }
  },[inRoom,dispatch]);

  const handleInRoom = () => {
    inRoom
      ? setInRoom(false)
      : setInRoom(true);
  }

  const handleNewMessage = () => {
    console.log('emitting new message');
    socket.emit('new message', {
      room: 'test-room'
    });
    setMessageCount(messageCount + 1);
  }
  
  // React.useEffect(() => {

    
          
    
    // client.onopen = () => {
    //   console.log("WebSocket Client Connected");

    //   client.send(
    //     JSON.stringify({
    //       type: "client_manifest",
    //       value: {
    //         user_id: colabstate.user_id,
    //         classroom_id: colabstate.classroom_id
    //       }
    //     })
    //   );
    // };

    // client.onmessage = message => {
    //   const dataFromServer = JSON.parse(message.data);
    //   const messageType = dataFromServer.type;
    //   const contentArray = dataFromServer.value;

    //   if (messageType === "allMessages") {
    //     setColabState({ ...colabstate, messages: contentArray });
    //   } else if (messageType === "new_classroom_message") {
    //     let oldMsg = colabstate.messages;

    //     oldMsg.push(contentArray);

    //     setColabState({ ...colabstate, messages: oldMsg });
    //   } else if (messageType === "connection_manifest") {
    //     //set connection id
    //     setColabState({ ...colabstate, connection_id: contentArray });
    //   } else if (messageType === "user_left" || messageType === "user_joined") {
    //     let whoLeft =
    //       contentArray === colabstate.user_id ? "You" : contentArray;
    //     let oldMsg = colabstate.messages;
    //     let action = messageType === "user_left" ? "left" : "joined";

    //     oldMsg.push({ message: whoLeft + " " + action, by: "server" });

    //     setColabState({ ...colabstate, messages: oldMsg });
    //   }
    // };
  // }, [colabstate]);
  /**
   * Button click controller
   */
  // const sendMessageAction = e => {
  //   e.preventDefault();
  //   const user_message = colabstate.user_message;
  //   if (user_message.trim().length <= 0) return;

    // var data;
    // data = {
    //   message: colabstate.last_sent_message,
    //   user_id: colabstate.user_id,
    //   time: new Date().getTime(),
    //   type: "classroom_message",
    //   classroom_id: colabstate.classroom_id
    // };

    // client.send(JSON.stringify(data));

  //   let oldState = { ...colabstate };
  //   oldState["last_sent_message"]["value"] = user_message;
  //   oldState["has_sent_message"] = false;
  //   oldState["user_message"] = "";
  //   const newState = oldState;

  //   setColabState(newState);
  // };

  /**
   * Input change handlers
   */
  // const inputChangedHandler = e => {
  //   e.preventDefault();
  //   let oldState = { ...colabstate };
  //   oldState["last_sent_message"]["value"] = e.target.value;
  //   oldState["user_message"] = e.target.value;
  //   let newState = oldState;
  //   setColabState(newState);
  // };

  /* When content changes, we send the
current content of the editor to the server. */
  // const onEditorStateChange = (text, content, value, name) => {
    
  // };

  return (
    <>
  <button id="user_class_state">{inRoom ? 'LEAVE' : 'JOIN'}</button>
    <h3>{colabstate.user_id} {!inRoom ? 'left..' : 'joined..'}</h3>
    </>
  );
}
