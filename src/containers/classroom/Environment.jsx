import React from 'react'
import Chat from './Chat.jsx'
import './editor.css'
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import { makeStyles ,fade} from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Nav from './Nav.jsx'
import {UnControlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  editor: {
    // padding: theme.spacing(2),
    float:'right',
    height:'100vh'
  },
  chat:{
    backgroundColor:fade(theme.palette.common.white, 0.15),
    height:'100vh',
    overflowY:true,
    float:'left'
  },
  Environment:{
    marginTop: '67px',
  }
}));

 function Environment() {
    const classes = useStyles();
        return (
            <React.Fragment className={classes.root}>
                  {/* <CssBaseline />
                   <Container fixed> */}
  <Nav/>

        <Grid container direction="row" className={classes.Environment}>
        <Grid item xs={12} md={3}  className={classes.chat}>
          <Chat />
        </Grid>
        <Grid container direction="column" xs={12} md={9} className={classes.editor}>
          <Grid item >
          <CodeMirror value='<h1>I ♥ react</h1>'
  options={{
    mode: 'html',
    theme: 'material',
    lineNumbers: true
  }}
  onChange={(editor, data, value) => {
  }}
/> 
           </Grid>
           <br/>
           <Grid item >
          <CodeMirror value='<h1>I ♥ react</h1>'
  options={{
    mode: 'css',
    theme: 'material',
    lineNumbers: true
  }}
  onChange={(editor, data, value) => {
  }}
/> 
           </Grid>
   
        </Grid>
       </Grid>
      {/* </Container> */}
            </React.Fragment>
        )
    
}

export default Environment;