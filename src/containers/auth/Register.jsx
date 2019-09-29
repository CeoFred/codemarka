import React,{useState} from "react";

import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';

import Github from "../../components/Partials/Auth/Button/Github";
import Google from "../../components/Partials/Auth/Button/Google";

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input";

import Helmet from "../../components/SEO/helmet";
import * as actionType from '../../redux/actions/Types';
import * as authAction from '../../redux/actions/authActions';

import Spinner from "../../components/Partials/Preloader";

import * as url from '../../config/url';

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


export default function Register() {
  const dispatch = useDispatch()
  const {loading} = useSelector((state) => state.auth)
  const formErrors = '';

  const [state, setState] = useState({
    formInputs : {
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
      checkbox:{
        value:false,
        isTouched:false
      }
    },
    isFormSubmitted : false,
    formerror : null,
  })
  
  const handleInputChange = (e,field) => {
    const updatedInput =  {
      ...state.formInputs,
        [field]: {
          ...state.formInputs[field],
          value: e.target.value,
          isTouched: true
        }
    }
    setState({...state,formInputs:updatedInput})
  }

  
const handleFormSubmit =  (e) => {
  e.preventDefault();
  // console.log('submitted');
  dispatch({type:actionType.AUTH_START})
  const {auth} = authAction;
  dispatch(auth(state))
}


  return (
    <div>
      <Helmet title="Signup to colab" metaDescription="" />

      <section>
        <div className="mt-3 row align-items-center justify-content-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
            <div>
              <div className="mb-5 text-center">
                <h6 className="h3 mb-1">Create your account</h6>
                <p className="text-muted mb-0">Made with love for developers</p>
                <div className="alert alert-danger">
                  {formErrors}
                </div>
              </div>
              <span className="clearfix" />
              <form>
                {/* username input */}
                <Input
                  type="text"
                  placeholder="superuser"
                  label="username"
                  initialPrepend
                  initialPrependsvg={userIconSvg}
                  value={state.formInputs.username.value}
                  changed={(e) => handleInputChange(e,'username')}
                />

                {/* email input */}
                <Input
                  type="email"
                  placeholder="someone@someserver.com"
                  label="Email address"
                  initialPrepend
                  initialPrependsvg={emailIconSvg}
                  value={state.formInputs.email.value}
                  changed={(e) => handleInputChange(e,'email')}

                  
                />
                {/* pasword input */}
                <Input
                  type="password"
                  placeholder="Secret password"
                  label="password"
                  isLoginPasswordInput={false}
                  initialPrepend
                  initialPrependsvg={initialPrependsvg}
                  value={state.formInputs.password.value}
                  changed={(e) => handleInputChange(e,'password')}

                />

                {/* checkbox */}
                <Input fieldtype="checkbox"
                selected={state.formInputs.checkbox.value}
                clicked={(e) => handleInputChange(e,'checkbox')}>
                  I agree to the{" "}
                  <Link to="/public/terms">terms and conditions</Link>
                </Input>

                <div className="mt-4">
                  <Button disabled={loading}  clicked={handleFormSubmit} type="button" textColor="#fff" block color="primary">
                    {!loading ?  'Create my account' : <Spinner/>}
                  </Button>
                </div>
              </form>
              <div className="py-3 text-center">
                <span className="text-xs text-uppercase">or</span>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  {/* github action button */}
                  <Github link={url.GITHUB_AUTH_URL} />
                  {/* github action button */}
                </div>

                <div className="col-sm-6">
                  <Google link={url.GOOGLE_AUTH_URL} />
                </div>
              </div>
              <div className="mt-4 text-center">
                <small>Already have an account?</small>
                <Link to={url.AUTH_SIGN_IN} className="small font-weight-bold">
                  signin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
