import React from "react";
import { useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";


import * as action from "../../redux/actions/";
import * as actionTypes from "../../redux/actions/Types";
import { dispatchAppEnvironment } from '../../redux/actions/appActions';


import './css/Environment.css';
import "../../components/classroom/Editor/editor.css";


export default function Environment(props) {

  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  
  const user = auth;
  const { match: { params } } = props;
  const classroomId = params.classroom;

  const checking = (
    <div class="env--content--loading text-center">
    <div class="spinner-grow" style={{width:'3rem',height:'3rem'}} role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div style={{marginTop:'5'}}>Checking classroom..</div>
  </div>
  );

  const [messageCount, setMessageCount] = React.useState(0);
  const [theme, setTheme] = React.useState("dark");
  const [inRoom, setInRoom] = React.useState(null);
  const [serverConfirmedToJoin, setserverConfirmedToJoin] = React.useState(false);


  const [colabstate, setColabState] = React.useState({
    messages: [],
    users: [],
    user_message: "",
    last_sent_message: { value: "" },
    has_sent_message: false,
    user_id: user.userId,
    classroom_id: classroomId,
    javascript_editor_content: "",
    html_editor_content: "",
    css_editor_content: "",
    username: 'User-'+Math.random()*32,
    loading: true,
    hasReallyJoined: false,
    content:checking
  });

  React.useEffect(() => {
      dispatch(dispatchAppEnvironment('classroom'));

      dispatch({
        type:actionTypes.CLASSROOM_ASYNC_VERIFICATION_INIT,
        classroom:colabstate.classroom_id
      })
     return () => {
    dispatch(dispatchAppEnvironment('regular'));
    }
  },[dispatch,colabstate.classroom_id])

  // runs for every re-render and initial render
  // React.useEffect(() => {
  //   window.document.title = "Join A classroom";
  //   const button = document.getElementById("user_class_state");
  //   button.addEventListener("click", handleInRoom);
  //   return function removeListener() {
  //     button.removeEventListener("click", handleInRoom);
  //   };
  // });

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

  // let msg = 'No message';
  // if(colabstate.messages){
  //   const classMsg = colabstate.messages;
  //   msg = '';
  // msg = classMsg.map((message) => {
  //   return <div key={Math.random()*32}><b>{message.from} - </b>{message.msg}</div>
  // });
  //   console.log(msg)
  // }
  return (
    <div className="env--container">
      {colabstate.content}
    </div>
  );
}