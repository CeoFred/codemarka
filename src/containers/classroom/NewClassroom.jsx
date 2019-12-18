import React, { useState } from "react";
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom';

import Spinner from "../../components/Partials/Preloader";
import { checkValidity } from "../../utility/shared";

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input/Input";
import Helmet from "../../components/SEO/helmet";

import Alert from "../../components/Partials/Alert/Alert";

import "./newclassroom.css";
import * as action from "../../store/actions";

function NewClassroom(props) {
  const [ state, setState ] = useState({
    controls: {
      name: {
        label: "Classroom Name",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Dragon Riders"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      topic: {
        label: "Topic",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Javascript ES6"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      },
      startDate: {
        label: "Start Date",
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Select Date"
        },
        value: "",
        validation: {
          required: true,
          isFutureDate: true
        },
        valid: false,
        touched: false
      },
      startTime: {
        label: "Start Time",
        elementType: "input",
        elementConfig: {
          type: "time",
          placeholder: "Select Time"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      visibility: {
        label: "Visibility",
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "",
              displayValue: "Select Visibility"
            },
            {
              value: "Public",
              displayValue: "Anyone can Join"
            },
            {
              value: "Private",
              displayValue: "Private"
            }
          ]
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      classType: {
        label: "classtype",
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "",
              displayValue: "Select class Type"
            },
            {
              value: "Basic Web App",
              displayValue: "Basic Web App"
            }
          ]
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      description: {
        label: "class description",
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          // placeholder: "Sele"
        },
        value: "",
        validation: {
          required: true
          // minLength: 3
        },
        valid: false,
        touched: false
      },
    },
    formisValid: false,
    formisSubmitted: props.loading ? true : false,
    formErrorMessage: false,
    formErrored: false,
    alertType: null
  });

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...state.controls,
      [ controlName ]: {
        ...state.controls[ controlName ],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          state.controls[ controlName ].validation
        ),
        touched: true
      }
    };

    let formisValid = true;
    for (let inputIdentifier in updatedControls) {
      formisValid = updatedControls[ inputIdentifier ].valid && formisValid;
    }

    setState({ ...state, controls: updatedControls, formisValid });
    // console.log(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    let formisSubmitted = true;
    setState({ ...state, formisSubmitted });
    
    let formData = {};

    if (state.formisValid) {
      for (let formElementIdentifier in state.controls) {
        formData[ formElementIdentifier ] =
          state.controls[ formElementIdentifier ].value;
      }
//       formData = {
//         classType: "Basic Web App",
// description: "wwdw",
// name: "jhgkdw",
// startDate: "2019-11-15",
// startTime: "02:03",
// topic: "kjnm,swd",
// token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNjOTI2NzdhMjg1ZjA4MzgxOWFkNzQiLCJ0b2tlbiI6IiIsImlhdCI6MTU3NDUyNTY4NiwiZXhwIjoxNTc0NjQ0NDg2fQ.Aom8vObSHTcQakLG7wBYR_3c12V1mOALPYMtO_6yD5c",
// visibility: "Public",
//       }
      formData.token = props.token;
  
      props.onCreate(formData);
      console.log(formData);
    
    } else {
      setState({
        ...state,
        alertType: "error",
        formErrored: true,
        formErrorMessage:
          "Form Validation Failed, please check inputs and try again"
      });
      return false;
    }
  };

  const formElementArray = [];
  for (let key in state.controls) {
    formElementArray.push({
      id: key,
      config: state.controls[ key ]
    });
  }
  let form = (
      <form onSubmit={ submitHandler }>
          {formElementArray.map(formElement => (
              <Input
          key={ formElement.id }
          elementConfig={ formElement.config.elementConfig }
          elementType={ formElement.config.elementType }
          value={ formElement.config.value }
          changed={ event => inputChangeHandler(event, formElement.id) }
          invalid={ formElement.config.valid }
          touched={ formElement.config.touched }
          label={ formElement.config.label }
        />
      ))}

          <Button
        block
        textColor="#fff"
        color="success"
        clicked={ submitHandler }
        disabled={ !state.formisValid }
      >
              {state.formisSubmitted ? <Spinner /> : "Go"}
          </Button>
      </form>
  );

  if(props.classroom){
    return (<Redirect to={ `/c/classroom/setup/${ props.classroom }` }/>)
  }

  return (
      <div>
          <Helmet
        title="Create a classroom || codemarka.inc"
        metaDescription=""
      ></Helmet>

          <section>
              <div className="row min-vh-100">
                  <div className="col-md-6 col-lg-6 col-xl-6 p-7 pl-3 pr-3 py-6 py-md-0">
                      <div>
                          <div className="mb-5 mt-2 text-center">
                              <b className="text-muted mb-0">Hello, {"user"}</b>
                          </div>
                          <span className="clearfix" />
                          <Alert
                type={ state.alertType }
                display={ state.formErrorMessage }
                title="Heads Up!"
              >
                              {state.formErrorMessage}
                          </Alert>
                          {form}
                      </div>
                  </div>
                  {/* image section */}

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-6 py-md-0 side">
                      <div className="align-content-center justify-content-center ">
                          <div className="pt-5 text-center">
                              <h6 className="h3 mb-1">Create your Free Classroom Today!</h6>
                          </div>
                          <span className="clearfix" />
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}

const mapStateToProps = ({ auth,classroom }) => {
  return {
    token: auth.user.token,
    classroom: classroom.classdetails ? classroom.classdetails._id : null,
    loading: classroom.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onCreate: (data) => dispatch( action.createClassRoomInit(data) ),
      
      onResetAll: () => dispatch(action.classResetAll())
  };
};
export default connect( mapStateToProps, mapDispatchToProps )(NewClassroom)