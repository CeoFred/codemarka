import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chat from '@material-ui/icons/Chat';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import TestMessages from './TestMessages'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import ArrowRightAltRounded from '@material-ui/icons/ArrowRightAltRounded'
import TestParticipants from './TestParticipants'

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 ,}}>
          
        {props.children}
      </Typography>
    );
  }
  
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    // position:'relative'
  },  title: {
    fontSize: 14,
  },button:{
    backgroundColor:'#3f51b5',
    borderRadius:'50%',
    color:'#fff',
    padding:20
  }
}));

export default function TestTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on">
          <Tab icon={<Chat />} aria-label="Phone" />
          <Tab icon={<PersonPinIcon />} aria-label="Person" />
        
        </Tabs>
      </AppBar>
      {value === 0 && <TestMessages/> }
      {value === 1 && <TestParticipants/>}
    </div>
  );
}
