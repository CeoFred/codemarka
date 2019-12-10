import React, { useState } from "react";
import io from "socket.io-client";

import Navigation from "../../components/classroom/UI/NavBar";
import Convo from "./Conversation";
import Editor from "../../components/classroom/Editor/Editor";
import Preview from "../../components/classroom/Editor/Preview";
import Seo from "../../components/SEO/helmet";

import "./css/Environment.css";

const host =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
    ? process.env.REACT_APP_REMOTE_API_URL
    : process.env.REACT_APP_LOCAL_API_URL;

const socket = io(`${host}classrooms`);

const MainClassLayout = ({ data, owner, name, description ,username, userid}) => {
  const [inputState, setInputState] = useState({
    value: "",
    isFocused: false,
    lastSentMessage: null
  });

  const [colabstate, setColabState] = useState({
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

    if (inRoom !== true && inRoom !== null) {
      // set listeners and emitters

      //listen for old message
      socket.on("updateMsg", msg => {
        setColabState(c => {
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
        setColabState(c => {
          let oldmsg = c.messages;
          oldmsg.push(msg);
          return { ...c, messages: oldmsg };
        });
        if (colabstate.messages) {
          const len = colabstate.messages.length;
          const lastIndex = len - 1;
          const ele = colabstate.messages[lastIndex].msgId
          const lelem = document.getElementById(ele);

          lelem.scrollIntoView(false);
        }
      });

      //listen for new messages
      socket.on("nM", data => {
        setColabState(
          c => {
            let oldmsg = c.messages;
            oldmsg.push(data);
            return { ...c, messages: oldmsg };
          });

        if (colabstate.messages) {
          const len = colabstate.messages.length;
          const lastIndex = len - 1;


          const ele = colabstate.messages[lastIndex].msgId
          const lelem = document.getElementById(ele);

          lelem.scrollIntoView(false);
        }
      });

      //listen for members leaving
      socket.on("updatechat_left", (msg) => {
        setColabState(c => {
          let oldmsg = c.messages;
          oldmsg.push(msg);
          return { ...c, messages: oldmsg };
        });
        if (colabstate.messages) {
          const len = colabstate.messages.length;
          const lastIndex = len - 1;

          const ele = colabstate.messages[lastIndex].msgId
          const lelem = document.getElementById(ele);

          lelem.scrollIntoView(false);
        }
      });

      // listen for classroom files
      socket.on("class_files", (css, html, js) => {

        // set editor state
        setColabState(c => {
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
        setColabState(c => {
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

        
          setColabState(c => {
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
      }
    };
  }, [
    colabstate.owner,
    colabstate.messages,
    username,
    data.classroom_id,
    userid,
    inRoom,
    colabstate.username,
    colabstate.classroom_id
  ]);

  const handleInputChange = e => {
    e.preventDefault();
    const value = e.target.value;
    setInputState({ ...inputState, value });
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

    colabstate.editors.forEach(element => {
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

            setColabState(c => {           
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

    styles = colabstate.previewContent.css.content;
    html = colabstate.previewContent.html.content;
    script = colabstate.previewContent.js.content;

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



  return (
    <div>
      <Preview previewBtnClicked={handlePreview} />
      <Navigation name={name} />
      {classNotification}
      <div style={{ width: "100%", height: "87vh" }}>
        <Seo title={`${name} :: colab classroom`} description={description}/>
        <Convo
          inputValue={inputState.value}
          handleInputChange={handleInputChange}
          sendMessage={e => handleMessageSubmit(e)}
          focused={inputState.isFocused}
          messages={colabstate.messages}
          user={userid}
        />

        <Editor
          readOnly={owner}
          handleEditorChange={(e, o, v, t) => editorChanged(e, o, v, t)}
          files={colabstate.editors}
        />
      </div>
    </div>
  );
};

export default MainClassLayout;
