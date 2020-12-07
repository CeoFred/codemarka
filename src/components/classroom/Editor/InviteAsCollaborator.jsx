import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import * as util from '../../../utility/shared';
import * as APP_URL from '../../../config/url';

function InviteAsCollaborator(props) {
  const code = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="${ window.location.host }/c/classroom/preview/${ props.classroom }?embed_host=share" allowfullscreen></iframe>`

  const [state, setState] = useState({showingEmbed: false, collaboratorList: []});

  useLayoutEffect(() => {
    if(!state.showingEmbed) {
        // fetch all collaborators

    }
  }, [state.showingEmbed])

  const handleCopyRoomLink = () => {
    util.copyToClipboard(`${ window.location.host + APP_URL.CLASSROOM.replace(':classroom',props.classroom) }`)
  };

  const copyEmbedCode = () => {
    util.copyToClipboard(code);
  } 
  return (
      <div>
          <button
              type="button"
              className="btn btn-primary d-none"
              data-toggle="modal"
              id="addAsCollaboratorButton"
              data-target="#addAsCollaborator"></button>

          <div
              className="modal fade docs-example-modal-sm"
              id="addAsCollaborator"
              tabindex="-1"
              role="dialog"
              aria-labelledby="addAsCollaboratorLabel"
              aria-hidden="true">
              {state.showingEmbed ? (
                  <div
                      className="modal-dialog modal-dialog-centered"
                      role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5
                                  className="modal-title"
                                  id="addAsCollaboratorLabel">
                                  Copy public embed code
                              </h5>
                              <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <div className="embed-container">
                                  <code>
                                      {code}
                                  </code>
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button
                                  type="button"
                                  onClick={ () =>
                                      setState({ showingEmbed: false })
                                  }
                                  className="btn btn-secondary btn-sm">
                                  Close
                              </button>
                              <button
                                  type="button"
                                  onClick={ copyEmbedCode }
                                  className="btn-sm btn btn-primary">
                                  Copy
                              </button>
                          </div>
                      </div>
                  </div>
              ) : (
                  <div
                      className="modal-dialog modal-dialog-centered"
                      role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5
                                  className="modal-title"
                                  id="addAsCollaboratorLabel">
                                  Invite to Collaborate
                              </h5>
                              <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <form>
                                  <div class="form-group">
                                      <div class="input-group">
                                          <input
                                              type="text"
                                              class="form-control"
                                              placeholder="Email address or username"
                                              aria-label="Recipient's username"
                                              aria-describedby="basic-addon2"
                                          />
                                          <div class="input-group-append">
                                              <button
                                                  type="button"
                                                  class="btn btn-sm btn-primary                                                  ">
                                                  Send Invite
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </form>

                              <div className="collaborators_list">

                              </div>
                          </div>
                          <div className="modal-footer">
                              <span type="button" className="copy_link" onClick={ handleCopyRoomLink }>
                                  <i className="fa fa-paperclip"></i>{' '}
                                  <span>Copy Link</span>
                              </span>
                              <span
                                  type="button"
                                  className="copy_link"
                                  onClick={ () =>
                                      setState({ showingEmbed: true })
                                  }>
                                  <i className="fa fa-code"></i> Get embed code
                              </span>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
  )
}

InviteAsCollaborator.propTypes = {
  classroom: PropTypes.string.isRequired
}

export default InviteAsCollaborator