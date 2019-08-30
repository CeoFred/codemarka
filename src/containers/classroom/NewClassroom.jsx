import React from "react";
import * as actions from '../../redux/actions/'

import {Redirect} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import Spinner from '../../components/Partials/Preloader';

 function NewClassroom(props) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

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
  
const handleClassCreatinon = (e) => {

    e.preventDefault()
    dispatch(actions.createNewClass(values))
    setValues({...values,buttonValue:<Spinner/>})
   
    if(state.classroom.errors){

      setValues({...values,buttonValue:'SETUP'})
  }


}
if(state.classroom.classdetails){
  return (<Redirect to={`/classroom/preview/${state.classroom.classdetails._id}`}/>)
}

  return (
    <div>
      <h1>New classroom</h1>
    </div>
  );
}


export default NewClassroom