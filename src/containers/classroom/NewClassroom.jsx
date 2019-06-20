import React from "react";
import Nav from "./Nav";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
// import bgImg from "../../../src/media/images/bg-01.jpg";
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

// import Book from "@material-ui/icons/";
import Select from '@material-ui/core/Select'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    position: "relative"
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    // height:400,
    width: 400,
    position: "absolute",
    left: "50%",
    marginLeft: -200,
    top: "50%",
    marginTop: 80,
    // opacity: 0.9,
  },
  textField: {
    // marginLeft:theme.spacing(1),
    // marginRight:theme.spacing(2),
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

export default function NewClassroom() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    size: 50,
    date: "",
    time:"",
    classTopic: "",
    owner: "",
    languages: [],
    visibility:'public',
    buttonValue:'SETUP'
  });
  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
function handleClassCreatinon(e){
    e.preventDefault()
    console.log(values)
    setValues({...values,buttonValue:<Progress/>})
}
  return (
    <div
      className={classes.root}
    //   style={{
    //     height: "100vh",
    //     background: `url(${bgImg})`,
    //     backgroundSize: "100% 100%",
    //     backgroundRepeat: "no-repeat"
    //   }}
    >
      <Nav />
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
                value={values.classTopic}
                onChange={handleValueChange("classTopic")}
                margin="dense"
                type="text"
                required
                placeholder="Topic"
                // helperText='what should '
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
          value={values.selectedDate}
          onChange={handleValueChange('date')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="mui-pickers-time"
          label="Time picker"
          value={values.selectedDate}
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
