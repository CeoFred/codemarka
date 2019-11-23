import React from 'react'
// import io from "socket.io-client";

import Navigation from "../../components/classroom/UI/NavBar";
import Convo from "./Conversation";
import Editor from "../../components/classroom/Editor/Editor";

const MainClassLayout = ({user_id,classroom_id}) => {

    // const [inRoom, setInRoom] = useState(false);

    // React.useEffect(() => {
    //     const socket = io("http://localhost:2001/classrooms");
        
    //     console.log('Room status - ',inRoom)
        
    //     const requestData = {
    //       classroom_id,
    //       user:user_id
    //     }

    //     if(inRoom === true){ // user requested to join the class
          
    //       // tell server to add user to class
    //       socket.emit('aRequestToAddUser',requestData)
    //       console.log('You joined')
          
    //       //listen for new members added
    //       socket.on('someoneJoined',(who,msg) => {
    //         setColabState((c) =>{
    //           let oldmsg = c.messages;
    //           oldmsg.push({from:who,msg})
    //           return {...c,messages:oldmsg}
    //         })
    //       })
    //       //listen for old message
    //       socket.on('updateMsg',(who,msg) => {
    //         setColabState((c) =>{
    //           return {...c,messages:msg}
    //         })
    //       })
          
    //       //listen for new messages
    
    //       //listen for members leaving
    //       socket.on('updatechat_left',(who,msg) => {
    //         setColabState((c) =>{
    //           let oldmsg = c.messages;
    //           oldmsg.push({from:who,msg})
    //           return {...c,messages:oldmsg}
    //         })
    //       })
    
    //     } else if(inRoom === null) {
    //       console.log('You have not joined')
    //     } else if(inRoom === false){
    //       console.log('You left')
    //     }
    //     return () => {
    //       console.log('return function',inRoom)
    //       if (inRoom) {
    //         console.log("Leaving room");
    //         socket.emit("leave", requestData);
            
    //         setColabState((c) =>{
    //           let oldmsg = c.messages;
    //           oldmsg.push({from:'self',msg:'you left'})
    //           return {...c,messages:oldmsg}
    //         })
    //         dispatch(action.userLeftAClass(colabstate.classroom_id));
    //       };
    //     }
    //   },[dispatch,inRoom,colabstate.username,colabstate.classroom_id]);
    
    return (
        <div>
        <Navigation classid={classroom_id}/>
            <div style={{width:'100%',position:'relative',height:'90vh'}}>
                <Convo />

                <div style={{float:'left',width:'70%',height:'100%'}}>
                <Editor />
                </div>
                
            </div>
        </div>
    )
}

export default MainClassLayout
