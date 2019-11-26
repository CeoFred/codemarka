import React,{useState , useEffect} from "react";
import {connect} from "react-redux"
import { Link, Redirect } from "react-router-dom";

import Github from "../../components/Partials/Auth/Button/Github";
import Google from "../../components/Partials/Auth/Button/Google";
import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input";
import Helmet from '../../components/SEO/helmet';
import Spinner from '../../components/Partials/Preloader';
import Alert from '../../components/Partials/Alert/Alert';

import * as action from "../../store/actions";
import { updateObject } from '../../utility/shared';


const initialPrependsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    class="feather feather-key"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const finalAppendsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    class="feather feather-eye"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const emailIconSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign">
  <circle cx="12" cy="12" r="4"></circle>
  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94">
  </path>
  </svg>
)

function Login(props) {
  const {onResetAll} = props;

  useEffect(() => {
  
    return () => {
      onResetAll();
    };
  }, [onResetAll]);
  
  const [state, setState] = useState({controls:{
    email: {
      value:''
    },password: {
      value:''
    }
  },
  formSubmitted: false,
  alertMessage:props.message,
  alertType:props.error && props.message  ? 'success' : 'danger',
})

/**
 * Handle input changes
 * @returns void
 */
  const handleInputChange = (e,controlName) => {
    e.preventDefault();
    const value  = e.target.value;
    const updatedControls = {
      ...state.controls,[controlName]:{
        ...state.controls[controlName],
      value
    }}
    setState({...state,controls:updatedControls});
  }

  const submitHandler = event => {
    event.preventDefault();

    let formSubmitted = true;
    setState(updateObject(state,formSubmitted));
    let formData = {};

    if (formSubmitted) {
      
      for (let formElementIdentifier in state.controls) {
        formData[formElementIdentifier] =
          state.controls[formElementIdentifier].value;
      }
      // dispatch(action.authLoginUser(formData));
      props.onAuth({...formData})

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
  let alert = (
    <Alert 
    display={props.message}
    type={state.alertType}
    >
      {props.message ? `${props.message}` : ''}
    </Alert>
);
let redct;

if(props.isAuthenticated){
setTimeout(() => {
redct = <Redirect to='/'/>
},1500);
}

  return (
    <div>
      <Helmet title="Sign Into your account" metaDescription="Return back to learn or host classrooms in real time" />
{redct}
      <section>
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
            <div>
              <div className="mb-5 text-center">
                <h6 className="h3 mb-1">Login</h6>
                <p className="text-muted mb-0">
                  Sign in to your account to continue.
                </p>
              </div>
              <span className="clearfix" />
              {alert}
              <form onSubmit={submitHandler}>
                <Input 
                type="email"
                placeholder="someone@someserver.com"
                label="Email address"
                initialPrepend
                initialPrependsvg={emailIconSvg}
                value={state.controls.email.value}
                changed={event => handleInputChange(event,'email')}
                />
                {/* pasword input */}
                <Input
                  type="password"
                  placeholder="Secret password"
                  label="password"
                  isLoginPasswordInput
                  initialPrepend
                  initialPrependsvg={initialPrependsvg}
                  value={state.controls.password.value}
                  finalAppend
                  finalAppendsvg={finalAppendsvg}
                  changed={event => handleInputChange(event,'password')}
                />
                <div className="mt-4">
                  <Button type="button"
                   clicked={submitHandler} 
                  disabled={props.loading}
                   textColor="#fff" 
                   block color="primary">
                    {props.loading ? <Spinner/> : 'Sign In'}
                  </Button>
                </div>
              </form>
              <div className="py-3 text-center">
                <span className="text-xs text-uppercase">or</span>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  {/* github action button */}
                  <Github link="github.com/oauth/" />
                  {/* github action button */}
                </div>

                <div className="col-sm-6">
                  <Google link="https://www.google.com/oauth" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <small>Not registered?</small>
                <Link to="/auth/signup" className="small font-weight-bold ml-1">
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.message,
    isAuthenticated: state.auth.user.token !== null,
    message: state.auth.message
  }
}


const mapDispatchToProps = dispatch => {
  return {
      onResetAll: () => dispatch(action.authResetAll()),
      onAuth: ( email, password ) => dispatch( action.authLoginUser( email, password ) )
  };
};
export default connect( mapStateToProps, mapDispatchToProps )(Login)