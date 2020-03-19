/* eslint-disable react/prop-types */
import React,{ useState } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Button from '../../components/Partials/Button';
import Input from '../../components/Partials/Input';
import Helmet from '../../components/SEO/helmet';
import Alert from '../../components/Partials/Alert/Alert'

import * as action from '../../store/actions'
import Spinner from '../../components/Partials/Preloader'

const initialPrependsvg = (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-key"
  >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);
function ChangePassword(props) {
     const {
         match: { params },
     } = props
     const token = params.token || null;
     const user = params.user || null;
     console.log(props);
    const [passwordResetControls, setPasswordReset] = useState({
        controls: {
            p1: {
                value: '',
                touched: false
            },
            p2: {
                value: '',
                touched: false
            }
        },
        formSubmitted: false,
        alertMessage: props.message,
        alertType: props.error && props.message ? 'success' : 'danger'
    })

    const handleInputChange = (event,controlName) => {
        event.preventDefault();
        
        const value = event.target.value
        const updatedControls = {
            ...passwordResetControls.controls,
            [controlName]: {
                ...passwordResetControls.controls[controlName],
                value,
                touched: true
            }
        }
        setPasswordReset({
            ...passwordResetControls,
            controls: updatedControls
        })
    }
    let redct
    if (props.isAuthenticated) {
        const host = window.location.href
        const url = new URLSearchParams(host)
        const redirectPath = url.get('redir')
        if (redirectPath) {
            redct = <Redirect to={ `${ redirectPath }` } />
        } else {
            window.location.href = window.location.origin
        }
    }

    const alert = (
        <Alert
            display={ props.message ? true : false }
            type={ passwordResetControls.alertType }>
            {props.message ? `${ props.message }` : ''}
        </Alert>
    )

    const handlePasswordReset = (e) => {
        e.preventDefault();

    }

  return (
      <div>
          <Helmet title="Set a new password" metaDescription="" />

          <section>
              <div class="row align-items-center justify-content-center min-vh-100">
                  <div class="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
                      <div>
                          <div class="mb-5 text-center">
                              <h6 class="h3 mb-1">Password Reset</h6>
                              <p class="text-muted mb-0">
                                  Hey! You can now set a new password for your
                                  account.
                              </p>
                          </div>
                          <span class="clearfix" />
                          {redct}
                          {alert}
                          <form onSubmit={ handlePasswordReset }>
                              {/* pasword input */}
                              <Input
                                  type="password"
                                  placeholder="New password"
                                  label="password"
                                  isLoginPasswordInput
                                  initialPrepend
                                  initialPrependsvg={ initialPrependsvg }
                                  value={
                                      passwordResetControls.controls.p1.value
                                  }
                                  changed={ e => handleInputChange(e, 'p1') }
                                  //   finalAppend
                                  //   finalAppendsvg={ finalAppendsvg }
                              />
                              {/* pasword input */}
                              <Input
                                  type="password"
                                  placeholder="Confirm New password"
                                  label="password again"
                                  isLoginPasswordInput
                                  initialPrepend
                                  initialPrependsvg={ initialPrependsvg }
                                  value={
                                      passwordResetControls.controls.p2.value
                                  }
                                  changed={ e => handleInputChange(e, 'p2') }
                                  //   finalAppend
                                  //   finalAppendsvg={ finalAppendsvg }
                              />
                              <div class="mt-4">
                                  <Button
                                      type="button"
                                      textColor="#fff"
                                      block
                                      onClick={ handlePasswordReset }
                                      color="success">
                                      { props.loading ? (
                                          <Spinner />
                                      ) : (
                                          'Reset'
                                      )}
                                  </Button>
                              </div>
                          </form>
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
        error: state.auth.message,
        isAuthenticated: state.auth.user.token !== null,
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetAll: () => dispatch(action.authResetAll()),
        onAccountRecovery: email => dispatch(action.accountRecoveryInit(email))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)