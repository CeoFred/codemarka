import React,{ useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import Input from '../../components/Partials/Input'
import Helmet from '../../components/SEO/helmet'
// import Spinner from '../../components/Partials/Preloader'
// import Alert from '../../components/Partials/Alert/Alert'

import * as action from '../../store/actions'
import * as APPURL from '../../config/url';
import { checkValidity } from '../../utility/shared'

import svgUrl from '../../media/images/svg/illustrations/illustration-11.svg';
import './style.css';

 const CommunityAccountRegistration = (props) => {

   useEffect(() => {
       props.onEnvironmentSwitch('classroom')
   });

   const [formControls, setFormControlState] = useState({
       controls: {
           communityName: {
               touched: false,
               value: '',
               validation: {
                   required: true,
                   minLength: 5,
               },
               valid: false,
           },
           communityAcronym: {
               touched: false,
               value: '',
               validation: {
                   required: true,
                   minLength: 2,
               },
               valid: false,
           },
           communityWebsite: {
               touched: false,
               value: '',
               validation: {
                   required: false,
                   minLength: 5,
                   url: true,
               },
               valid: true,
           },
           communityAffiliation: {
               touched: false,
               value: '',
               validation: {
                   required: true,
                   minLength: 2,
               },
               valid: false,
           },
           communityCity: {
               touched: false,
               value: '',
               validation: {
                   required: true,
                   minLength: 5,
               },
               valid: false,
           },
           communityCountry: {
               touched: false,
               value: '',
               validation: {
                   required: true,
                   minLength: 5,
               },
               valid: false,
           },
       },
       formisvalid: false,
       formisSubmitted: false,
   })

   const handleInputChage = (e) => {
       const controlName = e.target.name;
       const updatedControls = {
           ...formControls.controls,
           [controlName]: {
               ...formControls.controls[controlName],
               value: e.target.value,
               valid: checkValidity(
                   e.target.value,
                   formControls.controls[controlName].validation
               ),
               touched: true,
           },
       }
       let formisvalid = true
       for (const inputIdentifier in updatedControls) {
           formisvalid = updatedControls[inputIdentifier].valid && formisvalid
       }
       setFormControlState((formControl) => {
           return {...formControl,
           controls: updatedControls,
           formisvalid
        }
       })
   }
   

  return (
      <div className="community_container container-fluid">
          <Helmet title="Signup for a community Account - Codemarka" />
          <div className="row justify-content-center h-100">
              <div
                  class="card shadow-lg border-0"
                  style={{
                      maxWidth: '100%',
                      margin: '30px',
                      width: '100%',
                      maxHeight: '100vh',
                  }}>
                  <div class="card-body px-5 py-5 text-center text-md-left">
                      <div class="row align-items-center h-100">
                          <div
                              class="col-md-7 animated slideInLeft"
                              style={{
                                  height: '100%',
                                  overflowY: 'auto',
                                  maxHeight: '100%',
                              }}>
                              <div class="row">
                                  <div
                                      className="mb-5 text-left"
                                      style={{ paddingLeft: '15px' }}>
                                      <h6 className="h3 mb-1">
                                          <b>Community Information</b>
                                      </h6>
                                      <p className="text-muted mb-0">
                                          let's get to know your community to
                                          serve you better
                                      </p>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Community Name{' '}
                                              <span className="text-danger pl-1">
                                                  *
                                              </span>
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              name="communityName"
                                                 value={formControls.controls.communityName.value}
                                              onChange={handleInputChage}
                                              placeholder="Enter your communities name"
                                          />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Acronymn
                                              <span className="text-danger pl-1">
                                                  *
                                              </span>
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              name="communityAcronym"
                                                 value={formControls.controls.communityAcronym.value}
                                              onChange={handleInputChage}
                                              placeholder="GDG Owerri"
                                          />
                                      </div>
                                  </div>
                              </div>
                              <div class="row align-items-center">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Public Website
                                          </label>
                                          <input
                                              type="text"
                                              class="form-control"
                                              name="communityWebsite"
                                                 value={formControls.controls.communityWebsite.value}
                                              onChange={handleInputChage}
                                              placeholder="https://gdgowerri.dev"
                                          />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Affiliation{' '}
                                              <span className="text-danger pl-1">
                                                  *
                                              </span>
                                          </label>
                                          <select
                                              class="form-control"
                                              name="communityAffiliation"
                                                 value={
                                                     formControls.controls.communityAffiliation.value
                                                 }
                                              onChange={handleInputChage}
                                              data-toggle="select">
                                              <option value="GDG">
                                                  Google Developer Group
                                              </option>
                                              <option value="FDC">
                                                  Facebook Developer Circle
                                              </option>
                                              <option value="RNS">
                                                  Rather not say
                                              </option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              City{' '}
                                              <span className="text-danger pl-1">
                                                  *
                                              </span>
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              placeholder="Lagos"
                                              name="communityCity"
                                                 value={formControls.controls.communityCity.value}
                                              onChange={handleInputChage}
                                          />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Country{' '}
                                              <span className="text-danger pl-1">
                                                  *
                                              </span>
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              placeholder="Nigeria"
                                              name="communityCountry"
                                                 value={formControls.controls.communityCountry.value}
                                              onChange={handleInputChage}
                                          />
                                      </div>
                                  </div>
                                  <div className="flex align-items-center d-flex w-100 justify-content-between">
                                      <span className="text-primary font-weight-bolder ml-2">
                                          <Link
                                              to={
                                                  APPURL.COMMUNITY_ACCOUNT_LOGIN_PAGE
                                              }>
                                              Sign in instead
                                          </Link>
                                      </span>
                                      <button
                                          style={{ marginLeft: '15px' }}
                                          type="button"
                                          class="btn btn-primary hover-translate-y-n3 mr-2">
                                          Next
                                      </button>
                                  </div>
                              </div>
                          </div>
                          <div class="col-12 col-md-5 mt-4 mt-md-0 text-md-center h-100">
                              <img
                                  src={svgUrl}
                                  style={{
                                      height: '300px',
                                      position: 'absolute',
                                      bottom: '122px',
                                      left: '122px',
                                  }}
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onResetAll: () => dispatch(action.authResetAll()),
        onEnvironmentSwitch: (state) =>
            dispatch(action.dispatchAppEnvironment(state)),
    }
}
export default connect(
    null,
    mapDispatchToProps
)(CommunityAccountRegistration)
