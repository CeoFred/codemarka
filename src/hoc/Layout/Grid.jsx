import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import TestTab from "./TestTab";
import Editor from "../../containers/classroom/Editor/Editor";
import "../../containers/classroom/Editor/editor.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    minHeight: "100vh"
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const [colabstate, setColabState] = React.useState({
    messages: [],
    users: [],
    user_message: "",
    last_sent_message: { value: "" },
    has_sent_message: false,
    user_id: Math.random(),
    connection_id: null,
    classroom_id: null,
    javascript_editor_content: "",
    html_editor_content: "",
    css_editor_content: "",
    username: ""
  });

  React.useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    const classroom = url.get("classroom");
    setColabState({ ...colabstate, classroom_id: classroom });

    client.onopen = () => {
      console.log("WebSocket Client Connected");

      client.send(
        JSON.stringify({
          type: "client_manifest",
          value: {
            user_id: colabstate.user_id,
            classroom_id: colabstate.classroom_id
          }
        })
      );
    };

    client.onmessage = message => {
      const dataFromServer = JSON.parse(message.data);
      const messageType = dataFromServer.type;
      const contentArray = dataFromServer.value;

      if (messageType === "allMessages") {
        setColabState({ ...colabstate, messages: contentArray });
      } else if (messageType === "new_classroom_message") {
        let oldMsg = colabstate.messages;

        oldMsg.push(contentArray);

        setColabState({ ...colabstate, messages: oldMsg });
      } else if (messageType === "connection_manifest") {
        //set connection id
        setColabState({ ...colabstate, connection_id: contentArray });
      } else if (messageType === "user_left" || messageType === "user_joined") {
        let whoLeft =
          contentArray === colabstate.user_id ? "You" : contentArray;
        let oldMsg = colabstate.messages;
        let action = messageType === "user_left" ? "left" : "joined";

        oldMsg.push({ message: whoLeft + " " + action, by: "server" });

        setColabState({ ...colabstate, messages: oldMsg });
      }
    };
  }, [colabstate]);
  /**
   * Button click controller
   */
  const sendMessageAction = e => {
    e.preventDefault();
    const user_message = colabstate.user_message;
    if (user_message.trim().length <= 0) return;

    var data;
    data = {
      message: colabstate.last_sent_message,
      user_id: colabstate.user_id,
      time: new Date().getTime(),
      type: "classroom_message",
      classroom_id: colabstate.classroom_id
    };

    client.send(JSON.stringify(data));

    let oldState = { ...colabstate };
    oldState["last_sent_message"]["value"] = user_message;
    oldState["has_sent_message"] = false;
    oldState["user_message"] = "";
    const newState = oldState;

    setColabState(newState);
  };

  /**
   * Input change handlers
   */
  const inputChangedHandler = e => {
    e.preventDefault();
    let oldState = { ...colabstate };
    oldState["last_sent_message"]["value"] = e.target.value;
    oldState["user_message"] = e.target.value;
    let newState = oldState;
    setColabState(newState);
  };

  /* When content changes, we send the
current content of the editor to the server. */
  const onEditorStateChange = (text, content, value, name) => {
    var data;
    data = {
      time: new Date().getTime(),
      type: "editor_change",
      classroom_id: colabstate.classroom_id,
      name,
      value
    };

    client.send(JSON.stringify(data));
  };

  return (
    <Box component="div" className={classes.root}>
      {/* Top Navigation */}
      <PrimarySearchAppBar />
      {/* container */}
      <Grid container>
        {/* chat area */}
        <Grid item md={3}>
          <TestTab
            user_id={colabstate.user_id}
            messages={colabstate.messages}
            handleMessageChange={inputChangedHandler}
            sendMessage={sendMessageAction}
            textInputValue={colabstate.user_message}
          />
        </Grid>
        {/* end chata area */}

        {/* Text Editors */}
        <Grid item md={9}>
          {/* Text Editor container */}
          <Grid
            container
            spacing={1}
            direction="row"
            justify="space-evenly"
            alignItems="stretch"
          >
            {/* HTML Editor */}
            <Grid item md={6}>
              <Editor
                value='<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>Document</title>
                </head>
                <body>
                </body>
                </html>'
                options={{
                  mode: "htmlmixed",
                  theme: "material",
                  lineNumbers: true
                }}
                change={(editor, data, value) =>
                  onEditorStateChange(editor, data, value, "HTML")
                }
              />
            </Grid>
            {/* End HTML Editor */}

            {/* CSS Editor */}
            <Grid item md={6}>
              <Editor
                value="* {
                  padding:0;
                  margin:0;
                  display:block;
                  position:relative;
                }"
                options={{
                  mode: "css",
                  theme: "material",
                  lineNumbers: true
                }}
                change={(editor, data, value) =>
                  onEditorStateChange(editor, data, value, "CSS")
                }
              />
            </Grid>

            {/* End CSS Editor */}

            {/* Javascript Editor */}
            <Grid item md={12}>
              <Editor
                value="window.addEventListener('load',function(){
                  //do stuffs here
                })"
                options={{
                  mode: "javascript",
                  theme: "material",
                  lineNumbers: true
                }}
                change={(editor, data, value) =>
                  onEditorStateChange(editor, data, value, "JS")
                }
              />
            </Grid>
            {/* End Javascript Editor */}
          </Grid>
        </Grid>
        {/* End TextEditor */}
      </Grid>
      {/* End container */}
    </Box>
  );
}
