import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';

import Fab from '@material-ui/core/Fab';
import ArrowRightAltRounded from '@material-ui/icons/ArrowRightAltRounded'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'block',
  },
  list:{
    //   height:50
  }
}));

export default function TestMessages() {
  const classes = useStyles();

  return (
    <div style={{positon:'relative',height:'80vh'}}>
    <List className={classes.root}>
      <ListItem alignItems="flex-start" className={classes.list}>
      <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Donald"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {"Super Excited to be here"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
    <div style={{position:'absolute',bottom:0,paddigLeft:10}}>
    <Input/>
    </div>
    </div>
  );
}


function Input(){
  return(
    <>
    <textarea placeholder="Type a message..." rows="1"></textarea><Fab>
        <ArrowRightAltRounded/>
        </Fab>
    </>
  )
}