import React,{useState} from "react";
import * as actions from '../../redux/actions/Types'

// import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import Spinner from '../../components/Partials/Preloader';
import { checkValidity } from '../../utility/shared';

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input/Input";
import Helmet from '../../components/SEO/helmet';

// import Select from '../../components/Partials/Select';

import './newclassroom.css';

function NewClassroom(props) {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    controls: {
        email: {
          label:'Classroom Name',
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Dragon Riders'
            },
            value:'',
            validation: {
                required:true,
                minLength:10
            },
            valid:false,
            touched:false
        },
        startdate: {
          label:'Start Date',
            elementType:'input',
            elementConfig:{
                type:'date',
                placeholder:'Select Date'
            },value:'',
            validation: {
                required:true,
                // minLength: 3
            },
            valid:false,
            touched:false
        },
        starttime: {
          label:'Start Time',
            elementType:'input',
            elementConfig:{
                type:'time',
                placeholder:'Select Time'
            },value:'',
            validation: {
                required:true,
                // minLength: 3
            },
            valid:false,
            touched:false
        },
        visibility: {
          label:'Visibility',
            elementType:'select',
            elementConfig:{
                options:[
                  {
                    value: '',
                    displayValue:'Select Visibility'
                  },
                  {
                    value:'Public',
                    displayValue:'Anyone can Join'
                  },
                  {
                    value: 'Private',
                    displayValue:'Private'
                  }
                ],
            },value:'',
            validation: {
                required:true,
                minLength: 3
            },
            valid:false,
            touched:false
        },
    }, formisValid:false,
    formisSubmitted:false
})

    
const inputChangeHandler = (event,controlName) => {

  const updatedControls = {
      ...state.controls,
      [controlName] : {
          ...state.controls[controlName],
          value: event.target.value,
          valid: checkValidity(event.target.value,state.controls[controlName].validation),
          touched: true
      }
  };

  let formisValid = true;
for(let inputIdentifier in updatedControls){
  formisValid = updatedControls[inputIdentifier].valid && formisValid
}

  setState({controls:updatedControls,formisValid})
// console.log(updatedControls);
  
}   

const submitHandler = (event) => {
  event.preventDefault();
  setState({...state,formisSubmitted:true})
  dispatch({
    type: actions.CLASSROOM_CREATE_INIT
  })
} 

  const formElementArray = [];
  for(let key in state.controls){
      formElementArray.push({
          id:key,
          config:state.controls[key]
      });
  }
  let form = 
  <form onSubmit={submitHandler}>
  {formElementArray.map(formElement => (
      <Input key={formElement.id} 
      elementConfig={formElement.config.elementConfig}
      elementType={formElement.config.elementType}
      value={formElement.config.value}
      changed={(event) => inputChangeHandler(event,formElement.id)}
      invalid={formElement.config.valid}
      touched={formElement.config.touched}
      label={formElement.config.label}
      />
  ))}

  <Button block textColor='#fff' color="success" clicked={submitHandler} disabled={!state.formisValid}>
  {state.formisSubmitted ? <Spinner /> : 'Go'}
  </Button>

  </form>


// if(state.classroom.classdetails){
//   return (<Redirect to={`/classroom/preview/${state.classroom.classdetails._id}`}/>)
// }

  return (
    <div>
      <Helmet title="Create a classroom || colab.inc" metaDescription="">
        </Helmet>

      <section >
        <div class="row min-vh-100">
          <div class="col-md-6 col-lg-6 col-xl-6 p-7 pl-3 pr-3 py-6 py-md-0">
            <div>
              <div class="mb-5 mt-2 text-center">
                <b class="text-muted mb-0">
                  Hello, {'user'}
                </b>
              </div>
              <span class="clearfix" />
                {form}
            </div>
          </div>
      {/* image section */}

      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-6 py-md-0 side">
            <div className="align-content-center justify-content-center ">
              <div className="pt-5 text-center">
                <h6 className="h3 mb-1">
                Create your Free Classroom Today!
                
                </h6>
              </div>
              <span className="clearfix" />
              
            </div>
          </div>
          

        </div>
      </section>
    </div>
  );
}


export default NewClassroom


