import React,{ useState } from 'react'

import Spinner from '../../../../../components/Partials/Preloader'

function CommunityImageLogoUpload(props) {
  const handlePreviousForm = (e) => {
      props.returnToPreviousForm(3)
  }

  const handleFormSubmission = (event) => {
      event.preventDefault()
          const formData = {};
          setTimeout(() => props.isValidatedAndShouldProceed(5, formData), 1500)   
  }

  const [formControls, setFormControl] = useState({
      controls: {
          communityLogo: {
              url: '',
          },
      },
      formisvalid: true,
      formisSubmitted: false
  });

  return (
      <div className="row">
          <div
              className="col-md-12 mb-5 text-left"
              style={{ paddingLeft: '15px' }}>
              <h6 className="h3 mb-1">
                  <b>Upload Community Logo</b>
              </h6>
              <p className="text-muted mb-0">
                 For proper identity and branding..
              </p>
          </div>
          <div className="col-md-6">
              <div class="mt-4 mb-7">
                  <input
                      type="file"
                      name="communityLogo"
                      id="file-2"
                      class="custom-input-file custom-input-file--2"
                      data-multiple-caption="{count} files selected"
                  />
                  <label for="file-2">
                      <i classNamae="fa fa-file"></i>
                      <span>Choose a file…</span>
                  </label>
                  <p>Max 3MB, JPEG/PNG</p>
              </div>
          </div>
          <div className="flex align-items-center d-flex w-100 justify-content-between">
              <button
                  style={{ marginLeft: '15px' }}
                  type="button"
                  onClick={handlePreviousForm}
                  class="btn btn-primary hover-translate-y-n3 mr-2">
                  Back
              </button>
              <button
                  style={{ marginLeft: '15px' }}
                  type="button"
                  onClick={handleFormSubmission}
                  class="btn btn-primary hover-translate-y-n3 mr-2">
                  {formControls.formisSubmitted && formControls.formisvalid ? (
                      <Spinner />
                  ) : (
                      'Next'
                  )}
              </button>
          </div>
      </div>
  )
}

export default CommunityImageLogoUpload
