import React,{ useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Helmet from '../../../components/SEO/helmet'
import * as action from '../../../store/actions'
import svgUrl from '../../../media/images/svg/illustrations/illustration-11.svg';

import CommunityInformationStep from './Components/Steps/CommunityInfo';
import CommunityOrganizersStep from './Components/Steps/CommunityOrganizers';
import CommunityLoginCredentialsStep from './Components/Steps/CommunityLoginCredentials';
import CommunityImageLogoUploadStep from './Components/Steps/CommunityImageLogoUpload'
import CommunityContactInfoStep from './Components/Steps/CommunityContactInfo'
import CommunitySocialMediaStep from './Components/Steps/CommunitySocialMediaHandles'

import '../style.css';

 const CommunityAccountRegistration = (props) => {

   useEffect(() => {
       props.onEnvironmentSwitch('classroom')
   });

   const [currentFormStep, setCurrentFormStep] = useState(1);
   const [communitativeCommunityData, setcommunitativeCommunityData] = useState({})
   const setCurrentFormAndData = (step,data) => {
    setcommunitativeCommunityData(c => {
        return {...c,[step-1]:data}
    })
    setCurrentFormStep(step);
    console.log(step,data);
   }

   const handlereturnToPreviousForm = (step,data) => {
        setcommunitativeCommunityData((c) => {
            return { ...c, [step + 1]: data }
        })
       setCurrentFormStep(step);
   }
   const stepComponentObject = {
       1: (
           <CommunityInformationStep
               isValidatedAndShouldProceed={setCurrentFormAndData}
               returnToPreviousForm={handlereturnToPreviousForm}
               oldData={communitativeCommunityData[1]}
               {...props}
           />
       ),
       2: (
           <CommunityOrganizersStep
               isValidatedAndShouldProceed={setCurrentFormAndData}
               returnToPreviousForm={handlereturnToPreviousForm}
               oldData={communitativeCommunityData[2]}
               {...props}
           />
       ),
       3: (
           <CommunityContactInfoStep
               isValidatedAndShouldProceed={setCurrentFormAndData}
               returnToPreviousForm={handlereturnToPreviousForm}
               oldData={communitativeCommunityData[3]}
               {...props}
           />
       ),
       4: (
           <CommunityImageLogoUploadStep
               isValidatedAndShouldProceed={setCurrentFormAndData}
               returnToPreviousForm={handlereturnToPreviousForm}
               oldData={communitativeCommunityData[4]}
               {...props}
           />
       ),
       5: (
           <CommunitySocialMediaStep
               isValidatedAndShouldProceed={setCurrentFormAndData}
               returnToPreviousForm={handlereturnToPreviousForm}
               oldData={communitativeCommunityData[5]}
               {...props}
           />
       ),
       6: (
           <CommunityLoginCredentialsStep
               isValidatedAndShouldProceed={setCurrentFormAndData}
               returnToPreviousForm={handlereturnToPreviousForm}
               oldData={communitativeCommunityData[6]}
               {...props}
           />
       ),
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
                              class="col-md-7 animate"
                              style={{
                                  height: '100%',
                                  overflowY: 'auto',
                                  maxHeight: '100%',
                              }}>
                              {/* Steps */}
                              {stepComponentObject[currentFormStep]}
                              {/** Steps end */}
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
