import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Message(props) {
  const classes = useStyles();
  let who;
  if(props.self ===  props.from){
      who = 'You'
  }else{
      who = props.from
  }

 if(props.from === 'server'){
  return (
      <div className="bo-cir s-message">
      <small><b>::</b></small>
      <br/>
      {props.content}
      </div>
  )
 }else { return (
  // <List >
      <ListItem className={classes.root}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={who} secondary={props.content} />
      </ListItem>

      // <Divider variant="inset" component="li" /> 
    // </List>

   )
 }
}
