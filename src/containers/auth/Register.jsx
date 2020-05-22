import React,{ useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Github from '../../components/Partials/Auth/Button/Github';
import Google from '../../components/Partials/Auth/Button/Google';

import Button from '../../components/Partials/Button';
import Input from '../../components/Partials/Input';
import Select from '../../components/Partials/Input/Input';
import Helmet from '../../components/SEO/helmet';
import Spinner from '../../components/Partials/Preloader';
import Alert from '../../components/Partials/Alert/Alert';

import * as URLS from '../../config/url';
import * as APIURLS from '../../config/api_url';

import * as action from '../../store/actions';

import * as APPURLS from '../../config/url'
import { updateObject } from '../../utility/shared'
import Logo from '../../media/images/logo/codemark__logo.png'
import './style.css'

const emailIconSvg = (
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
    className="feather feather-at-sign"
  >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
);

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
    className="feather feather-key"
  >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const userIconSvg = (
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
    className="feather feather-user"
  >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

function Register(props) {

    const { onClassroomSwitch,onResetAll } = props
    const [mounted,setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
        if(!mounted){
            onResetAll()
            onClassroomSwitch('classroom')
        }
    }, [mounted, onResetAll, onClassroomSwitch])
    


  const [ state, setState ] = useState({
    controls : {
      username : {
        value: '',
        isTouched: false,
        isValid: false
      },
      email: {
        
        value: '',
        isTouched: false,
        isValid: false
      },
      password: {
        
        value: '',
        isTouched: false,
        isValid: false
      },
      techStack: {
        value: '',
        isTouched: false,
        isValid: false
      },
      checkbox:{
        value:false,
        isTouched:false
      }
    },
    formSubmitted: false,
    alertMessage:props.message,
    alertType : Boolean(props.error) === true   ? 'danger' : 'success',
  
  })
  
  const handleInputChange = (e,controlName) => {
    e.preventDefault();
    const value  = e.target.value;
    const updatedControls = {
      ...state.controls,[ controlName ]:{
        ...state.controls[ controlName ],
      value
    } }
    setState({ ...state,controls:updatedControls });
  }

  const submitHandler = event => {
    event.preventDefault();

    const formSubmitted = true;
    setState(updateObject(state,formSubmitted));
    const formData = {};

    if (formSubmitted) {

      for (const formElementIdentifier in state.controls) {
        formData[ formElementIdentifier ] =
          state.controls[ formElementIdentifier ].value;
      }
      props.onAuth({ ...formData })

    } else {

      setState({
        ...state,
        alertType: 'danger',
        formErrored: true,
        formErrorMessage:
          'Form Validation Failed, please check inputs and try again'
      });
      return false;
    }
  };

//   const handleAlertClick = (e) => {
//        e.preventDefault();
//       props.onAlertClose()
//   }

  let alert = (
      <Alert 
              display={ props.message }
              type={ props.error ? 'danger':'success' }
              >
          {props.message ? `${ props.message }` : ''}
      </Alert>
);
let redct;

if(props.isAuthenticated){

const host = window.location.href
const url = new URLSearchParams(host)
const redirectPath = url.get('redir')
if (redirectPath) {
    redct = <Redirect to={ `${ redirectPath }` } />
} else {
    redct = <Redirect to="/?auth_rdir=r" />
}
}

if (props.authRegistrationSuccess) {
    alert = (
        <Alert display={ true } type="success">
            {props.message ? `${ props.message }` : ''}
        </Alert>
    )
}
  return (
      <div>
          <Helmet
              title="Signup to codemarka"
              metaDescription="Get started today by creating a free account on codemarka."
          />
          {redct}

          <section className="container-fluid">
              <div
                  className="row min-vh-100"
                  style={{ maxHeight: '100vh', overflow: 'hidden' }}>
                  <div className="comm_bg_img col-md-8 col-xl-8 col-lg-8 py-6 py-md-0 h-100vh d-none d-md-flex d-lg-flex d-xl-flex">
                      <div className="details_container">
                          <div className="logo_container">
                              <img
                                  src={Logo}
                                  height="25"
                                  alt="codemarka_logo"
                              />
                              <span className="badge badge-warning">PRO</span>
                          </div>
                          <div className="mb-2">
                              <p className="float-left p-text text-white line-height-1">
                                  Get the best out of every classrom and enjoy
                                  <br />
                                  all our exciting features by
                                  <br /> getting a community account today.
                              </p>
                          </div>
                          <Link to={APPURLS.COMMUNITY_ACCOUNT_SIGNUP_PAGE}>
                              <button
                                  type="button"
                                  class="btn btn-animated btn-primary btn-animated-x">
                                  <span class="btn-inner--visible">
                                      SIGN UP
                                  </span>
                                  <span class="btn-inner--hidden">
                                      <i className="fa fa-arrow-alt-circle-right"></i>
                                  </span>
                              </button>
                          </Link>
                      </div>
                  </div>

                  <div
                      className="mt-3 p-3 col-md-4 col-lg-4 col-xl-4 py-6 h-100 py-md-0 oveflow-auto"
                      style={{ maxHeight: '100vh', overflow: 'auto' }}>
                      <div>
                          <div className="mb-5 text-center">
                              <h6 className="h3 mb-1 mt-3">
                                  Create your account
                              </h6>
                              <p className="text-muted mb-0">
                                  Made with love for developers
                              </p>
                              {alert}
                          </div>
                          <span className="clearfix" />
                          <form onSubmit={submitHandler}>
                              {/* username input */}
                              <Input
                                  type="text"
                                  placeholder="superuser"
                                  label="username"
                                  initialPrepend
                                  initialPrependsvg={userIconSvg}
                                  value={state.controls.username.value}
                                  changed={(e) =>
                                      handleInputChange(e, 'username')
                                  }
                              />

                              {/* email input */}
                              <Input
                                  type="email"
                                  placeholder="someone@someserver.com"
                                  label="Email address"
                                  initialPrepend
                                  initialPrependsvg={emailIconSvg}
                                  value={state.controls.email.value}
                                  changed={(e) => handleInputChange(e, 'email')}
                              />
                              {/* pasword input */}
                              <Input
                                  type="password"
                                  placeholder="Secret password"
                                  label="password"
                                  isLoginPasswordInput={false}
                                  initialPrepend
                                  initialPrependsvg={initialPrependsvg}
                                  value={state.controls.password.value}
                                  changed={(e) =>
                                      handleInputChange(e, 'password')
                                  }
                              />

                              <Select
                                  elementType="select"
                                  changed={(e) => {
                                      handleInputChange(e, 'techStack')
                                  }}
                                  elementConfig={{
                                      options: [
                                          {
                                              value: '',
                                              displayValue: 'What do you do?',
                                              selected: true,
                                          },
                                          {
                                              value: 'FE',
                                              displayValue:
                                                  'Front End Developer',
                                          },
                                          {
                                              value: 'BE',
                                              displayValue:
                                                  'Back End Developer',
                                          },
                                          {
                                              value: 'AI',
                                              displayValue: 'Machine Learning',
                                          },
                                          {
                                              value: 'FS',
                                              displayValue: 'Fullstack',
                                          },
                                      ],
                                  }}
                              />
                              <div className="mt-4">
                                  <Button
                                      type="submit"
                                      clicked={submitHandler}
                                      disabled={props.loading}
                                      textColor="#fff"
                                      block
                                      color="primary">
                                      {props.loading ? (
                                          <Spinner />
                                      ) : (
                                          'Create my account'
                                      )}
                                  </Button>
                              </div>
                          </form>
                          <div className="py-3 text-center">
                              <span className="text-xs text-uppercase">or</span>
                          </div>

                          <div className="row">
                              <div className=" col-sm-6">
                                  <Github
                                      link={
                                          APIURLS.GITHUB_AUTH_URL +
                                          '?auth=signup&vendor=github'
                                      }
                                  />
                              </div>
                              <div className="col-sm-6">
                                  <Google
                                      link={
                                          APIURLS.GOOGLE_AUTH_URL +
                                          '?auth=signup&vendor=google'
                                      }
                                  />
                              </div>
                          </div>
                          <div className="mb-4 mt-2 text-center">
                              <small>Already have an account?</small>{' '}
                              <Link
                                  to={URLS.AUTH_SIGN_IN}
                                  className="small font-weight-bold">
                                  signin
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.user.token !== null,
      message: state.auth.message,
      authRegistrationSuccess: state.auth.Registrationsuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, username, techStack) =>
          dispatch(
              action.authRegisterUser(email, password, username, techStack)
          ),
      onAlertClose: () => dispatch(action.ClearMessage()),
      onResetAll: () => dispatch(action.authResetAll()),
      onClassroomSwitch: (state) =>
          dispatch(action.dispatchAppEnvironment(state)),
  }
};
export default connect( mapStateToProps, mapDispatchToProps )(Register)