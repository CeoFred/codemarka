import React,{ useState } from 'react'
import axios from 'axios';

import Spinner from '../../../../../components/Partials/Preloader'

function CommunityImageLogoUpload(props) {
  const handlePreviousForm = (e) => {
      props.returnToPreviousForm(3)
  }

  const [state, setstate] = useState({
      file:null,
      message:null,
      isValid: true,
      uploadStatus: null,
      error: null
  });

  const handleFormSubmission = (event) => {
      event.preventDefault()
          const formData = {};
          setTimeout(() => props.isValidatedAndShouldProceed(5, formData), 1500)   
  }

  const checkMimeType = (event) => {
      //getting file object
      let files = event.target.files
      //define message container
      let err = ''
      // list allow mime type
      const types = ['image/png', 'image/jpeg',]
      // loop access array
      for (var x = 0; x < files.length; x++) {
          // compare file type find doesn't matach
          if (types.every((type) => files[x].type !== type)) {
              // create error message and assign to container
              err += files[x].type + ' is not a supported format\n'
          }
      }

      if (err !== '') {
          // if message not same old that mean has error
          event.target.value = null // discard selected file
          console.log(err)
          setstate({ ...state, error: true, isValid: true, message: 'File type not supported' })

          return false
      }
      return true
  }

  const maxSelectFile = (event) => {
      let files = event.target.files // create file object
      if (files.length > 1) {
          const msg = 'Only one image can be uploaded'
          setstate({...state,error:true,isValid:true,message:msg});
          event.target.value = null // discard selected file
          console.log(msg)
          return false
      }
      return true
  }

  const checkFileSize = (event) => {
      let files = event.target.files
      console.log(files[0].size);
      let size = 1010000
      let err = ''
      for (let x = 0; x < files.length; x++) {
          if (files[x].size > size) {
              err +=
                  files[x].type + 'is too large, please pick a smaller file\n'
          }
      }
      if (err !== '') {
          event.target.value = null;
          setstate({
              ...state,
              error: true,
              isValid: true,
              message: 'File too Large',
          })

          console.log(err)
          return false
      }

      return true
  }

  const onChangeHandler = (event) => {
      const file = event.target.files[0];
      if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) {
          setstate({ error: null, isValid: true, message: null, file: null })

          setFormControl({
              ...formControls,
              formisvalid: false,
              formisSubmitted: true,
              inProgress :true});
          setstate({ ...state, file });
          const data = new FormData();
          data.append('file', file);

          axios
              .post('http://localhost:2001/auth/community/upload/logo', data)
              .then((res) => {
                  console.log(res.statusText)
                  setFormControl({
                      ...formControls,
                      formisvalid: true,
                      formisSubmitted: false,
                      inProgress: false,
                  })
              }).catch(err => {
                  setFormControl({
                      ...formControls,
                      formisvalid: true,
                      formisSubmitted: false,
                      inProgress: false,
                  })
              });
      } 
  }

  const [formControls, setFormControl] = useState({
      controls: {
          communityLogo: {
              url: '',
          },
      },
      formisvalid: true,
      formisSubmitted: false,
      inProgress:false
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
                      onChange={onChangeHandler}
                      className="custom-input-file custom-input-file--2"
                      data-multiple-caption="{count} files selected"
                  />
                  <label htmlFor="file-2">
                      <i classNamae="fa fa-file-upload"></i>
                      <span>Choose a file…</span>
                  </label>
                  <p>Max 1MB, JPEG/PNG</p>
                  <p className={`text-${state.error === true ? 'danger':'success'}`}>
                  {state.message}
                  </p>
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
                  {formControls.inProgress && formControls.formisSubmitted ? (
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