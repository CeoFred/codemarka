import React,{ useEffect, useState } from 'react';
import { connect } from 'react-redux'

import Input from '../../components/Partials/Input'
import Helmet from '../../components/SEO/helmet'
import Spinner from '../../components/Partials/Preloader'
import Alert from '../../components/Partials/Alert/Alert'

import * as action from '../../store/actions'
import * as APIURLS from '../../config/api_url'

import './style.css';
 function CommunityAccountRegistration(props) {

   useEffect(() => {
       props.onEnvironmentSwitch('classroom')
   });
   const step2 = (
       <div class="row">
           <div class="col-md-6">
               <div class="form-group">
                   <label class="form-control-label">Email</label>
                   <input
                       class="form-control"
                       type="email"
                       placeholder="name@exmaple.com"
                   />
                   <small class="form-text text-muted mt-2">
                       This is the main email address that we'll send
                       notifications as well your signin email.
                   </small>
               </div>
           </div>
           <div class="col-md-6">
               <div class="form-group">
                   <label class="form-control-label">Phone</label>
                   <input
                       class="form-control"
                       type="text"
                       placeholder="+40-777 245 549"
                   />
               </div>
           </div>
       </div>
   );
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
                                              Community Name
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              placeholder="Enter your communities name"
                                          />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Acronymn
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
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
                                              data-toggle="date"
                                              placeholder="https://gdgowerri.dev"
                                          />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Affiliation
                                          </label>
                                          <select
                                              class="form-control"
                                              data-toggle="select">
                                              <option value="1">
                                                  Google Developer Group
                                              </option>
                                              <option value="2">
                                                  Facebook Developer Circle
                                              </option>
                                              <option value="2">
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
                                              City
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              placeholder="Lagos"
                                          />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <label class="form-control-label">
                                              Country
                                          </label>
                                          <input
                                              class="form-control"
                                              type="text"
                                              placeholder="Nigeria"
                                          />
                                      </div>
                                  </div>

                                  <button
                                      style={{ marginLeft: '15px' }}
                                      type="button"
                                      class="btn btn-primary hover-translate-y-n3">
                                      Next
                                  </button>
                              </div>
                          </div>
                          <div class="col-12 col-md-5 mt-4 mt-md-0 text-md-right community_vector_img_bg h-100"></div>
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
