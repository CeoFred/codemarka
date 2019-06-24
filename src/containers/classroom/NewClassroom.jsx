import React from "react";
import Nav from "./Nav";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Progress from '../../components/UI/progress'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {useSelector,useDispatch} from 'react-redux'
import Select from '@material-ui/core/Select'
import * as actions from '../../redux/actions/'

import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    position: "relative"
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    width: 400,
    position: "absolute",
    left: "50%",
    marginLeft: -200,
    top: "50%",
    marginTop: 80,
  },
  textField: {
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  formControl:{
      margin:theme.spacing(2),
      minWidth:220,
      width:'100%'
  },
  button:{
      float:'right',
      marginTop:30
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

 function NewClassroom(props) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    size: "> 10",
    date: Date(),
    time:Date(),
    topic: "",
    owner: state.auth.userId,
    visibility:'public',
    buttonValue:'SETUP',
    description:'',
    token:state.auth.token,
    location:''
  });
  
  /**
   * Handle input change
   */
  const handleValueChange = name => event => {
  
    if(name === 'date' || name === 'time'){
      setValues({...values,[name]:event})
    }else{
    setValues({ ...values, [name]: event.target.value });

    }
  
  };
  var shouldRedirectOnSuccess = false
  
function handleClassCreatinon(e){

    e.preventDefault()
    dispatch(actions.createNewClass(values))
    setValues({...values,buttonValue:<Progress/>})
   
    if(state.classroom.errors){

      setValues({...values,buttonValue:'SETUP'})
  }


}
if(state.classroom.classdetails){
  return (<Redirect to={`/classroom/preview/${state.classroom.classdetails._id}`}/>)
}

  return (
    <div
      className={classes.root}>
      <Nav />
      {shouldRedirectOnSuccess}
      {/* <Container fixed > */}
      <Paper className={classes.paper}>

        <form className={classes.container} autoComplete='off'>
          <h1>Create A new classroom</h1>
          <Grid container alignItems="flex-end">

            <FormControl className={classes.formControl}>           
              <TextField
                id="name"
                label="classname"
                className={clsx(classes.textField, classes.dense)}
                value={values.name}
                onChange={handleValueChange("name")}
                margin="dense"
                type="text"
                required
                placeholder="My classname"
                // helperText='what should '
              />

              <TextField
                id="topic"
                label="Topic"
                className={clsx(classes.textField, classes.dense)}
                value={values.topic}
                onChange={handleValueChange("topic")}
                margin="dense"
                type="text"
                required
                placeholder="Topic"
                // helperText='what should '
              />
              
              
              <TextField
                id="location"
                label="location"
                className={clsx(classes.textField, classes.dense)}
                value={values.location}
                onChange={handleValueChange("location")}
                margin="dense"
                type="text"
                required
                placeholder="location"
              />
              
            </FormControl>

        <FormControl className={classes.formControl}>
<TextField name="description"
 className={clsx(classes.textField, classes.dense)}
 onChange={handleValueChange("description")}
    value={values.description}
    placeholder="About this class..."
  id="description"
   rows={2}         
   rowsMax={10}
  multiline={true}
/>

          </FormControl>
            
            {/* size */}
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor='class_size'>Classroom size</InputLabel>
              <Select 
            value={values.size}
            onChange={handleValueChange('size')}
            inputProps={{
                name:'class_size',
                id:'class_size'
            }}
            >
            <MenuItem value={'> 10'}> > 10 </MenuItem>
            <MenuItem value={'> 20'}> > 20 </MenuItem>
            <MenuItem value={'> 50'}> > 50 </MenuItem>
            <MenuItem value={'> 60'}> > 60 </MenuItem>

            </Select>
            </FormControl>


            
            
            {/* visibility */}
            <FormControl className={classes.formControl}>

            {/* <MuiPickersUtilsProvider> */}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid}>
        <KeyboardDatePicker
          margin="normal"
          id="mui-pickers-date"
          label="Date picker"
          value={values.date}
          onChange={handleValueChange('date')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="mui-pickers-time"
          label="Time picker"
          value={values.time}
          onChange={handleValueChange('time')}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Visibility</FormLabel>
        <RadioGroup
          aria-label="visibility"
          name="visibility"
          className={classes.group}
          value={values.visibility}
          row
          onChange={handleValueChange('visibility')}
        >
          <FormControlLabel
            value="Private"
            control={<Radio color="secondary" />}
            label="public"
            labelPlacement="start"
          />
          <FormControlLabel
            value="Public"
            control={<Radio color="primary" />}
            label="private"
            labelPlacement="start"
          />
          
        </RadioGroup>
      </FormControl>
          </Grid>

          <Button onClick={handleClassCreatinon} className={classes.button} variant="contained" color="primary">{values.buttonValue}</Button>
        </form>
      </Paper>
      {/* </Container>  */}
    </div>
  );
}


export default NewClassroom