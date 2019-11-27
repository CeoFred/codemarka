import React, { useState } from "react";
import io from "socket.io-client";

import Navigation from "../../components/classroom/UI/NavBar";
import Convo from "./Conversation";
// import Editor from "../../components/classroom/Editor/Editor";


const socket = io("http://localhost:2001/classrooms");

const MainClassLayout = ({ data }) => {
  const [inputState, setInputState] = useState({
    value: "",
    isFocused: false,
    lastSentMessage:null,
  });

  const [colabstate, setColabState] = useState({
      messages:[]
  });
  const [inRoom] = useState(false);

  React.useEffect(() => {


      console.log('Room status - ',inRoom);

      const requestData = {
        classroom_id:data.classroom_id,
        user:data.user_id
        };  

      if(inRoom !== true && inRoom !== null){
       // set listeners and emitters

     
        // tell server to add user to class
        socket.emit('join',requestData);
        console.log('You joined');
        
        




        //listen for old message
        socket.on('updateMsg',(who,msg) => {
          setColabState((c) =>{
            return {...c,messages:msg}
          });
        });

                //listen for new members added
                socket.on('someoneJoined',(from,msg,user) => {
                  setColabState((c) =>{
                    let oldmsg = c.messages;
                    oldmsg.push({by:from,msg,user})
                    return {...c,messages:oldmsg}
                  });
                });

        //listen for new messages
        socket.on('nM',(data) => {
          console.log(data);
          setColabState((c) =>{
            let oldmsg = c.messages;
            oldmsg.push({by:data.user,msg: data.message,name:data.name})
            return {...c,messages:oldmsg}
          });

        });


        //listen for members leaving
        socket.on('updatechat_left',(who,msg) => {
          setColabState((c) =>{
            let oldmsg = c.messages;
            oldmsg.push({by:who,msg})
            return {...c,messages:oldmsg}
          });
        });

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
          });
        //   dispatch(action.userLeftAClass(colabstate.classroom_id));
        };
      }
    },[data.classroom_id,data.user_id,inRoom,colabstate.username,colabstate.classroom_id]);

  const handleInputChange = e => {
    e.preventDefault();
    const value = e.target.value;
    setInputState({ ...inputState, value });
  };

  const handleMessageSubmit = (e) => {
      e.preventDefault();

      setInputState({...inputState,
        lastSentMessage:e.target.value,
        value:''});

        const msg_data = {
          user:data.user_id,
          class:data.classroom_id,
          message:inputState.value
        }
        console.log(msg_data);

        socket.emit('newMessage',msg_data)
  };

  const userLeftInput = e => {
    e.preventDefault();
    setInputState({ ...inputState, isFocused: false });
  };

  const userEnteredInput = e => {
    e.preventDefault();
    setInputState({ ...inputState, isFocused: true });
  };

  return (
    <div>
      <Navigation classid={data.classroom_id} />
      <div style={{ width: "100%", height: "87vh" }}>
        <Convo
          inputValue={inputState.value}
          handleInputChange={handleInputChange}
          sendMessage={(e) => handleMessageSubmit(e)}
          inputBlur={userLeftInput}
          inputFocused={userEnteredInput}
          focused={inputState.isFocused}
          messages={colabstate.messages}
          user={data.user_id}
        />

        <div style={{ float: "left", width: "60%", height: "100%" }}>
          {/* <Editor /> */}
          Editor Here
        </div>
      </div>
    </div>
  );
};

export default MainClassLayout;
