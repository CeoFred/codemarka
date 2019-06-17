import React from "react";
import Chat from "./Chat/Chat.jsx";
import "./Editor/editor.css";

import { makeStyles, fade } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Nav from "./Nav.jsx";
import { UnControlled as CodeMirror } from "react-codemirror2";
import Editor from './Editor/Editor.jsx';

require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1
  },
 editor: {
    // padding: theme.spacing(2),
    float: "right",
    height: "100vh"
  },
  chat: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    height: "100vh",
    overflow: "auto"
  },
  Environment: {
    marginTop: "67px"
  }

}));

function Environment() {

  let  handleEditorChange = (editor,data,value) => {

  }
  const classes = useStyles();
  return (
    <React.Fragment className={classes.root}>
      <Nav />
      <Grid container direction="row" className={classes.Environment}>
        <Grid item xs={12} md={3} className={classes.chat}>
          <Chat />
        </Grid>
        <Grid
          container
          direction="column"
          xs={12}
          md={9}
          className={classes.editor}>

          <Grid item>
            <Editor value="<html></htm>" options={{
                mode: "html",
                theme: "material",
                lineNumbers: true
              }}
              change={(editor,data,value) =>handleEditorChange(editor,data,value)}
              />
            

          </Grid>
          <Grid item>
            <CodeMirror
              value="<h1>I ♥ react</h1>"
              options={{
                mode: "css",
                theme: "material",
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {}} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Environment;
