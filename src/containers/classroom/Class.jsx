import React, { useState } from "react";
import io from "socket.io-client";

import Navigation from "../../components/classroom/UI/NavBar";
import Convo from "./Conversation";
import Editor from "../../components/classroom/Editor/Editor";
import Preview from "../../components/classroom/Editor/Preview";
import Alert from "../../components/Partials/Alert/Alert";

import "./css/Environment.css";

const host =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
    ? process.env.REACT_APP_REMOTE_API_URL
    : process.env.REACT_APP_LOCAL_API_URL;

const socket = io(`${host}classrooms`);

const MainClassLayout = ({ data, owner, name }) => {
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
    owner: owner === data.user_id
  });

  const [inRoom, setInRoom] = useState(false);

  React.useEffect(() => {
    const requestData = {
      classroom_id: data.classroom_id,
      userId: data.user_id,
      username: data.username
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
      });

      //listen for new messages
      socket.on("nM", data => {
        setColabState(
          c => {
            let oldmsg = c.messages;
            oldmsg.push(data);
            return { ...c, messages: oldmsg };
          },
          function(d) {
            console.log(d);
          }
        );
        if (colabstate.messages) {
          const len = colabstate.messages.length;
          const lastIndex = len - 1;

          const lelem = document.getElementById(lastIndex);

          lelem.scrollIntoView(false);
        }
      });

      //listen for members leaving
      socket.on("updatechat_left", (who, msg) => {
        setColabState(c => {
          let oldmsg = c.messages;
          oldmsg.push({ by: who, msg });
          return { ...c, messages: oldmsg };
        });
      });

      // listen for classroom files
      socket.on("class_files", (css, html) => {

        // set editor state
        setColabState(c => {
          return {
            ...c,
            editors: [
              { file: "css", ...css },
              { file: "html", ...html }
            ]
          };
        });

        // set preview state
        setColabState(c => {
          return {
            ...c,
            previewContent: {
              html,
              css
            }
          };
        });

      });

      //listen to file changes
      socket.on("class_files_updated", ({ id, file, content }) => {

        if (colabstate.owner) {
          // user owns the class, has the current state, no need to update Editor
          // rather update the preview content which has no listners or cause anny
          // side effect.

          setColabState(c => {
            return {
              ...c,
              previewContent: { ...c.previewContent, [file]: { content, id } }
            };
          });

        } else {


          setColabState(c => {
            let oldFiles;
            c.editors.forEach((element, i) => {
              if (element.file === file && element.id === id) {
                console.log(element);

                oldFiles = c.editors;
                oldFiles[i].content = content;
              }
            });
            return { ...c, editors: oldFiles,
              previewContent:{...c.previewContent,[file]:{content,id}} };
          });
        }
      });
    }

    return () => {
      console.log("return function", inRoom);
      if (inRoom) {
        console.log("Leaving room");
        socket.emit("leave", requestData);
        socket.disconnect();
      }
    };
  }, [
    colabstate.owner,
    colabstate.messages,
    data.username,
    data.classroom_id,
    data.user_id,
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

    setInputState({
      ...inputState,
      lastSentMessage: e.target.value,
      value: ""
    });

    const msg_data = {
      user: data.user_id,
      class: data.classroom_id,
      message: inputState.value
    };
    socket.emit("newMessage", msg_data);
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
      id: fid
    };

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

    // if(o.origin === 'cut' && o.removed[0] !== ""){
    //   socket.emit("editorChanged", emitObj);
    // }

    // if(o.origin === 'paste' && o.text.length > 1){
    //   if(o.text[0] && o.text[1] !== ''){
    //     socket.emit("editorChanged", emitObj);

    //   }
    // }
    console.log(emitObj);
  };



  const handlePreview = e => {
    const previewFrame = document.getElementById("preview_iframe");
    var preview =  previewFrame.contentDocument || previewFrame.contentWindow.document;

    preview.open();
    if(colabstate.previewContent.html.content !== null) {
      preview.write(colabstate.previewContent.html.content);
    }
    preview.close();
  };

  let classNotification;
  if(!colabstate.owner){
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
        <Convo
          inputValue={inputState.value}
          handleInputChange={handleInputChange}
          sendMessage={e => handleMessageSubmit(e)}
          focused={inputState.isFocused}
          messages={colabstate.messages}
          user={data.user_id}
        />

        <Editor
          readOnly={colabstate.owner}
          handleEditorChange={(e, o, v, t) => editorChanged(e, o, v, t)}
          files={colabstate.editors}
        />
      </div>
    </div>
  );
};

export default MainClassLayout;
