import React, { useState } from "react";
import io from "socket.io-client";

import Navigation from "../../components/classroom/UI/NavBar";
import Convo from "./Conversation";
// import Editor from "../../components/classroom/Editor/Editor";

const host = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL

const socket = io(`${host}classrooms`);

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



      const requestData = {
        classroom_id:data.classroom_id,
        userId:data.user_id,
        username: data.username
        };  

      if(inRoom !== true && inRoom !== null){
       // set listeners and emitters

     
       
        //listen for old message
        socket.on('updateMsg',(msg) => {
          setColabState((c) =>{
            let oldmsg = c.messages;
            msg.msgs.forEach(element => {
              oldmsg.push(element);
            });
            return {...c,messages:oldmsg}
          });
        });
        // tell server to add user to class
        socket.emit('join',requestData);
        

                //listen for new members added
                socket.on('someoneJoined',(msg) => {
                  setColabState((c) =>{
                    let oldmsg = c.messages;
                    oldmsg.push(msg)
                    return {...c,messages:oldmsg}
                  });
                });

        //listen for new messages
        socket.on('nM',(data) => {
          setColabState((c) =>{
            let oldmsg = c.messages;
            oldmsg.push(data)
            return {...c,messages:oldmsg}
          },function(d){
            console.log(d);
          });
          if(colabstate.messages){
            const len = colabstate.messages.length;
            const lastIndex = len - 1;
            
            const lelem = document.getElementById(lastIndex);

              lelem.scrollIntoView(false);
 
          }

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
        };
      }
    },[data.username,data.classroom_id,data.user_id,inRoom,colabstate.username,colabstate.classroom_id]);

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

        <div style={{ float: "left", width: "70%", height: "100%" }}>
          {/* <Editor /> */}
          Editor Here
        </div>
      </div>
    </div>
  );
};

export default MainClassLayout;
