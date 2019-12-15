import React, { useState } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from "../../components/classroom/UI/NavBar";
import Convo from "./Conversation";
import Editor from "../../components/classroom/Editor/Editor";
import Preview from "../../components/classroom/Editor/Preview";
import Seo from "../../components/SEO/helmet";

import { CLASSROOM_FILE_DOWNLOAD } from "../../config/api_url";
import "./css/Environment.css";

const host =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
    ? process.env.REACT_APP_REMOTE_API_URL
    : process.env.REACT_APP_LOCAL_API_URL;

const socket = io(`${host}classrooms`,{autoConnect: false});
toast.configure({
          autoClose:6000,
          draggable:true
        });

const MainClassLayout = ({ data, owner, name, description ,username, userid}) => {
  const [inputState, setInputState] = useState({
    value: "",
    isFocused: false,
    lastSentMessage: null
  });

  const [codemarkastate, setcodemarkaState] = useState({
    messages: [],
    editors: [],
    previewContent: {
      html: null,
      css: null
    },
    owner
  });

  const [inRoom, setInRoom] = useState(false);

  React.useEffect(() => {
    const requestData = {
      classroom_id: data.classroom_id,
      userId: userid,
      username
    };
    console.log(socket.id);

    if (inRoom !== true && inRoom !== null) {
      // set listeners and emitters
      socket.open();

      //listen for old message
      socket.on("updateMsg", msg => {
        setcodemarkaState(c => {
          let oldmsg = c.messages;
          msg.msgs.forEach(element => {
            oldmsg.push(element);
          });
          return { ...c, messages: oldmsg };
        });
      });





      // tell server to add user to class
      socket.emit("join", requestData);
      setInRoom(true)
      //listen for new members added
      socket.on("someoneJoined", msg => {
        setcodemarkaState(c => {
          let oldmsg = c.messages;
          oldmsg.push(msg);
          return { ...c, messages: oldmsg };
        });
        if (codemarkastate.messages) {
          const len = codemarkastate.messages.length;
          const lastIndex = len - 1;
          const ele = codemarkastate.messages[lastIndex].msgId
          const lelem = document.getElementById(ele);

          lelem.scrollIntoView(false);
        }
      });

      socket.on('disconnect',(reason) => {
        console.log(reason);
        
        toast.warn("Disconnected from classroom",{
       position: toast.POSITION.BOTTOM_RIGHT
     });
      })

      socket.on('connect', () => {
     console.log(socket.connected); // true
     toast.success("Connected",{
       position: toast.POSITION.BOTTOM_RIGHT
     })
    });




      //listen for new messages
      socket.on("nM", data => {
        setcodemarkaState(
          c => {
            let oldmsg = c.messages;
            oldmsg.push(data);
            return { ...c, messages: oldmsg };
          });

        if (codemarkastate.messages) {
          const len = codemarkastate.messages.length;
          const lastIndex = len - 1;


          const ele = codemarkastate.messages[lastIndex].msgId
          const lelem = document.getElementById(ele);

          lelem.scrollIntoView(false);
        }
      });

      //listen for members leaving
      socket.on("updatechat_left", (msg) => {
        setcodemarkaState(c => {
          let oldmsg = c.messages;
          oldmsg.push(msg);
          return { ...c, messages: oldmsg };
        });
        if (codemarkastate.messages) {
          const len = codemarkastate.messages.length;
          const lastIndex = len - 1;

          const ele = codemarkastate.messages[lastIndex].msgId
          const lelem = document.getElementById(ele);

          lelem.scrollIntoView(false);
        }
      });

      socket.on("utyping", ({username, userid}) => {
        console.log(username,'is typing');
      })

      // listen for classroom files
      socket.on("class_files", (css, html, js) => {

        // set editor state
        setcodemarkaState(c => {
          return {
            ...c,
            editors: [
              { file: "css", ...css },
              { file: "html", ...html },
              {file: "js",...js}
            ]
          };
        });

        // set preview state
        setcodemarkaState(c => {
          return {
            ...c,
            previewContent: {
              html,
              css,
              js
            }
          };
        });

      });

      //listen to file changes
      socket.on("class_files_updated", ({ id, file, content ,editedBy}) => {

        
          setcodemarkaState(c => {
            // check preview states
            if(editedBy !== userid){
              let oldFiles;
            c.editors.forEach((element, i) => {
              if (element.file === file && element.id === id) {
                oldFiles = c.editors;
                oldFiles[i].content = content;
              }
            });
              return {
              ...c,
              editors: oldFiles,
              previewContent: { ...c.previewContent, [file]: { content, id } }
            };
            }else {
              return {...c};
            }          
          });


      });
    }

    return () => {
      if (inRoom) {
        socket.emit("leave", requestData);
        setInRoom(false);
      }
    };
  }, [
    codemarkastate.owner,
    codemarkastate.messages,
    username,
    data.classroom_id,
    userid,
    inRoom,
    codemarkastate.username,
    codemarkastate.classroom_id
  ]);

  const handleInputChange = e => {

    e.preventDefault();
    const value = e.target.value;
    setInputState({ ...inputState, value });

    socket.emit('user_typing',{username,userid,classroomid:data.classroom_id});
  };

  const handleMessageSubmit = e => {
    e.preventDefault();

    if(inputState.value !== ''){
      setInputState({
      ...inputState,
      lastSentMessage: e.target.value,
      value: ""
    });

    const msg_data = {
      user: userid,
      class: data.classroom_id,
      message: inputState.value
    };
    socket.emit("newMessage", msg_data);
    }
    
  };


  const editorChanged = (e, o, v, t) => {
    let fid;

    codemarkastate.editors.forEach(element => {
      if (element.file === t) {
        fid = element.id;
      }
    });

    const emitObj = {
      file: t,
      content: v,
      class: data.classroom_id,
      user: data.user_id,
      id: fid,
      editedBy: userid
    };

            setcodemarkaState(c => {           
            return {
              ...c,
              previewContent: { ...c.previewContent, [t]: { content:v, id:fid } }
            };
          });    
     
    
    if(o.origin === '+input'){
      if((o.text[0]).trim() !== '' && ((o.text[0]).trim()).length === 1){
        socket.emit("editorChanged", emitObj);
      }
    }

    if(o.origin === '+delete'){
      if((o.removed[0]).trim() !== ""){
        socket.emit("editorChanged", emitObj);
      }
    }

    console.log('editor changed');

    // if(o.origin === 'cut' && o.removed[0] !== ""){
    //   socket.emit("editorChanged", emitObj);
    // }

    // if(o.origin === 'paste' && o.text.length > 1){
    //   if(o.text[0] && o.text[1] !== ''){
    //     socket.emit("editorChanged", emitObj);

    //   }
    // }
  };



  const handlePreview = e => {
    const previewFrame = document.getElementById("preview_iframe");
    // var preview =  previewFrame.contentDocument || previewFrame.contentWindow.document;
    let styles, html , script;

    styles = codemarkastate.previewContent.css.content;
    html = codemarkastate.previewContent.html.content;
    script = codemarkastate.previewContent.js.content;

    const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')

  const source = `
    <html>
      <head>
<html lang="en">
      
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `

  return getBlobURL(source, 'text/html')
}

const url = getGeneratedPageURL({
  html,
  css:styles,
  js: script
})


    if(styles && html && script) {
      previewFrame.src = url

    }
    
  };

  let classNotification;
  if(!owner){
    classNotification = (
      <div class="alert alert-group alert-info alert-icon fixed-bottom w-25 left-10" role="alert">
	<div class="alert-group-prepend"> 
        <span class="alert-group-icon text-white">
            <i className="fa fa-info-circle"></i>
        </span>
    </div>
    <div class="alert-content">
        <strong>Heads up!</strong> You cannot format the editors.
    </div>
	<div class="alert-action">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
    </div>
</div>
    );
  }

const classfilesdownloadlink =  `${host}${CLASSROOM_FILE_DOWNLOAD}${data.classroom_id}`;

  return (
    <div>
     <ToastContainer />
      <Preview previewBtnClicked={handlePreview} classroomid={data.classroom_id}/>
      {classNotification}
      <Navigation name={name} downloadLink={classfilesdownloadlink}/>

      <div style={{ width: "100%", height: "87vh" }}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-2 p-0">
    <Seo title={`${name} :: codemarka classroom`} description={description}/>
        <Convo
        username={username}
          inputValue={inputState.value}
          handleInputChange={handleInputChange}
          sendMessage={e => handleMessageSubmit(e)}
          focused={inputState.isFocused}
          messages={codemarkastate.messages}
          user={userid}
        />
            </div>
            <div className="col-10 p-0">
<Editor
          readOnly={owner}
          handleEditorChange={(e, o, v, t) => editorChanged(e, o, v, t)}
          files={codemarkastate.editors}
        />
            </div>
          </div>
        </div>
        

        
      </div>
    </div>
  );
};

export default MainClassLayout;
