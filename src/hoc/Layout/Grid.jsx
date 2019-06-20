import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import TestTab from "./TestTab";
import Editor from "../../containers/classroom/Editor/Editor";
import "../../containers/classroom/Editor/editor.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    minHeight:'100vh'
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const handleEditorChange = () => {};
  return (
    <Box component="div" className={classes.root}>
      {/* Top Navigation */}
      <PrimarySearchAppBar />
      {/* container */}
      <Grid container>
        {/* chat area */}
        <Grid item md={3}>
          <TestTab />
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
                  handleEditorChange(editor, data, value)
                }
              />
            </Grid>
            {/* End HTML Editor */}

            {/* CSS Editor */}
            <Grid item md={6}>
              <Editor
                value="css"
                options={{
                  mode: "css",
                  theme: "material",
                  lineNumbers: true
                }}
                change={(editor, data, value) =>
                  handleEditorChange(editor, data, value)
                }
              />
            </Grid>

            {/* End CSS Editor */}

            {/* Javascript Editor */}
            <Grid item md={12}>
              <Editor
                value="js"
                options={{
                  mode: "javascript",
                  theme: "material",
                  lineNumbers: true
                }}
                change={(editor, data, value) =>
                  handleEditorChange(editor, data, value)
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
