import React from "react";
import "../../containers/classroom/Editor/editor.css";
import { useSelector,useDispatch} from "react-redux";
import * as action from "../../redux/actions/index.jsx";

import io from "socket.io-client";

export default function Environment() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const user = state.auth;
  // const [messageCount, setMessageCount] = React.useState(0);
  // const [theme, setTheme] = React.useState("dark");
  const [inRoom, setInRoom] = React.useState(null);
  // const [serverConfirmedToJoin, setserverConfirmedToJoin] = React.useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  let classroom_id = ''
    if (urlParams.has("classroom_id")) {
       classroom_id = urlParams.get("classroom_id");
    
    }
  const [colabstate, setColabState] = React.useState({
    messages: [],
    users: [],
    user_message: "",
    last_sent_message: { value: "" },
    has_sent_message: false,
    user_id: user.userId,
    classroom_id: classroom_id || null,
    javascript_editor_content: "",
    html_editor_content: "",
    css_editor_content: "",
    username: 'User-'+Math.random()*32,
    // theme,
    hasReallyJoined: false,
  });

  // runs for every re-render and initial render
  React.useEffect(() => {
    window.document.title = "Join A classroom";
    const button = document.getElementById("user_class_state");
    button.addEventListener("click", handleInRoom);
    return function removeListener() {
      button.removeEventListener("click", handleInRoom);
    };
  });

  // effect for joining a room
  React.useEffect(() => {
    const socket = io("http://localhost:8000/classrooms");
    
    console.log('Room status - ',inRoom)
    const requestData = {
      classroom_id:colabstate.classroom_id,
      username:colabstate.username
    }
    if(inRoom === true){ // user requested to join the class
      
      // tell server to add user to class
      socket.emit('aRequestToAddUser',requestData)
      console.log('You joined')
      
      //listen for new members added
      socket.on('someoneJoined',(who,msg) => {
        setColabState((c) =>{
          let oldmsg = c.messages;
          oldmsg.push({from:who,msg})
          return {...c,messages:oldmsg}
        })
      })
      //listen for old message
      socket.on('updateMsg',(who,msg) => {
        setColabState((c) =>{
          return {...c,messages:msg}
        })
      })
      
      //listen for new messages

      //listen for members leaving
      socket.on('updatechat_left',(who,msg) => {
        setColabState((c) =>{
          let oldmsg = c.messages;
          oldmsg.push({from:who,msg})
          return {...c,messages:oldmsg}
        })
      })

    } else if(inRoom === null) {
      console.log('You have not joined')
    } else if(inRoom === false){
      console.log('You left')
    }
    return () => {
      console.log('return function',inRoom)
      if (inRoom) {
        console.log("Leaving room");
        socket.emit("leave", requestData);
        
        setColabState((c) =>{
          let oldmsg = c.messages;
          oldmsg.push({from:'self',msg:'you left'})
          return {...c,messages:oldmsg}
        })
        dispatch(action.userLeftAClass(colabstate.classroom_id));
      };
    }
  },[dispatch,inRoom,colabstate.username,colabstate.classroom_id]);

  const handleInRoom = () => {
    inRoom ? setInRoom(false) : setInRoom(true);
  };

  // const handleNewMessage = () => {
  //   console.log("emitting new message");
  //   socket.emit("new message", {
  //     room: "test-room"
  //   });
  //   setMessageCount(messageCount + 1);
  // };

  let msg = 'No message';
  if(colabstate.messages){
    const classMsg = colabstate.messages;
    msg = '';
  msg = classMsg.map((message) => {
    return <div key={Math.random()*32}><b>{message.from} - </b>{message.msg}</div>
  });
    console.log(msg)
  }
  return (
    <>
      <button id="user_class_state">{inRoom ? "LEAVE" : "JOIN"}</button>
      <h3>
      </h3>
      <hr/>
      {msg}
    </>
  );
}