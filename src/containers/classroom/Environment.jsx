import React from 'react'
import Chat from './Chat.jsx'
import './editor.css'
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Nav from './Nav.jsx'
import {UnControlled as CodeMirror} from 'react-codemirror2'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color:theme.palette.text.secondary ,
  },
  chat:{
    backgroundColor:'#e9ecef'
  }
}));

 function Environment() {
    const classes = useStyles();
        return (
            <React.Fragment className={classes.root}>
                  {/* <CssBaseline />
                   <Container fixed> */}
  <Nav/>

        <Grid container spacing={1} direction="row"
  justify="center"
  alignItems="center"
>
        <Grid item xs={12} md={3} className={classes.chat}>
          <Chat />
        </Grid>
        <Grid item xs={12} md={9} >
        <CodeMirror value='<h1>I ♥ react-codemirror2</h1>'
  options={{
    mode: 'html',
    theme: 'material',
    lineNumbers: true
  }}
  onChange={(editor, data, value) => {
  }}
/> 
        </Grid>
       </Grid>
      {/* </Container> */}
            </React.Fragment>
        )
    
}

export default Environment;