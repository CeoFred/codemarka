/* eslint-disable no-undef */
import React, { useState, useLayoutEffect, useEffect } from 'react'
import PropTypes from 'prop-types'

import * as util from '../../../utility/shared';
import * as APP_URL from '../../../config/url';
import * as API from '../../../config/api_url'
import http from '../../../services/http';
import './collaborators.css'
function InviteAsCollaborator(props) {
  const code = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="${ window.location.host }/c/classroom/preview/${ props.classroom }?embed_host=share" allowfullscreen></iframe>`

  const [state, setState] = useState({message:'',
                                     messageType:'',
                                     inputValue:'',
                                     searchSuggestions:[],
                                     showingEmbed: false, 
                                     collaboratorList: [],
                                     noResultsAfterSearch:false
                                    });

  useEffect(() => {
      
  }, [])

  useLayoutEffect(() => {
    if(!state.showingEmbed) {
        http().GET(`${ API.FETCH_EDITOR_CONTRIBUTORS }${ props.classroom }`).then(response => {
            setState({...state, collaboratorList: response.data.message});
        })
    }
  }, [state.showingEmbed])

  const handleCopyRoomLink = () => {
    util.copyToClipboard(`${ window.location.host + APP_URL.CLASSROOM.replace(':classroom',props.classroom) }`)
  };

  const copyEmbedCode = () => {
    util.copyToClipboard(code);
  } 

  const handleEmailUsernameChange = (e) => {
       
        const { value } = e.target;
        setState({ ...state, inputValue: value, noResultsAfterSearch: false})
        window.clearInterval(window.localStorage.getItem('intervalKey'));
        
        const timeoutKey  = setTimeout(() => {
            http()
            .GET(`${ API.FIND_USER_BY_EMAIL_OR_USERNAME }${ value }`)
            .then(response => {
                setState({
                    ...state,
                    searchSuggestions: response.data.message,
                    noResultsAfterSearch: response.data.message.length === 0,
                    inputValue: value
                })
            });
        }, 1500);

        window.localStorage.setItem('intervalKey', timeoutKey);
  }

  const handleClearSuggestion = (e) => {
    setState({ ...state, searchSuggestions: [], noResultsAfterSearch: false })
  }

  const handleSendInvite = (e) => {
      e.preventDefault();
      props.socket.emit('invite_to_collaborate', state.inputValue, props.classroom)
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
              className="modal fade"
              id="addAsCollaborator"
              tabindex="-1"
              role="dialog"
              aria-labelledby="addAsCollaboratorLabel"
              aria-hidden="true">
              {state.showingEmbed ? (
                  <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                      style={ {
                          width: '40%!important',
                          maxWidth: '40%!important',
                      } }>
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
                                  <code>{code}</code>
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button
                                  type="button"
                                  onClick={ () =>
                                      setState({
                                          ...state,
                                          showingEmbed: false,
                                      })
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
                      role="document"
                      style={ {
                          width: '40%!important',
                          maxWidth: '40%!important',
                      } }>
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
                              <form style={ { position: 'relative' } } onSubmit={ handleSendInvite }>
                                  <div class="form-group">
                                      <div class="input-group">
                                          <input
                                              type="text"
                                              class="form-control"
                                              placeholder="Email address or username"
                                              value={ state.inputValue }
                                              onChange={
                                                  handleEmailUsernameChange
                                              }
                                              onBlur={ handleClearSuggestion }
                                          />
                                          <div class="input-group-append">
                                              <button
                                                  type="button"
                                                  onClick={ handleSendInvite }
                                                  class="btn btn-sm btn-primary">
                                                  Send Invite
                                              </button>
                                          </div>
                                      </div>
                                  </div>

                                  {(state.searchSuggestions.length ||
                                      state.noResultsAfterSearch) && (
                                          <div className="search_suggestion">
                                              {state.searchSuggestions &&
                                                  state.searchSuggestions.map(
                                                      (suggestion) => {
                                                          return (
                                                              <div className="search_suggestion_item">
                                                                  <img
                                                                      src={
                                                                          suggestion.gravatarUrl
                                                                      }
                                                                      className="search_suggestion_item_gravatar"
                                                                  />{' '}
                                                                  {
                                                                      suggestion.username
                                                                  }
                                                              </div>
                                                          )
                                                      }
                                                  )}
                                              {state.noResultsAfterSearch && (
                                                  <div className="search_suggestion_item">
                                                      Whoops! user not found.
                                                  </div>
                                              )}
                                          </div>
                                      )}
                              </form>

                              <div className="collaborators_list">
                                  {state.collaboratorList.map(
                                      (collaborator) => {
                                          return (
                                              <div className="collaborator_container">
                                                  <div className="collaborator_data">
                                                      <div>
                                                          <img
                                                              src={
                                                                  collaborator.avatar
                                                              }
                                                              className="collaborator_data_img"
                                                          />
                                                      </div>
                                                      <b className="collaborator_data_username">
                                                          {
                                                              collaborator.username
                                                          }{' '}
                                                          {collaborator.isowner && (
                                                              <span>
                                                                  (owner)
                                                              </span>
                                                          )}
                                                      </b>
                                                  </div>
                                                  {collaborator.isowner && (
                                                      <div className="action">
                                                          <i className="fa fa-close"></i>
                                                      </div>
                                                  )}
                                              </div>
                                          )
                                      }
                                  )}
                              </div>
                          </div>
                          <div className="modal-footer">
                              <span
                                  type="button"
                                  className="copy_link"
                                  onClick={ handleCopyRoomLink }>
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
  classroom: PropTypes.string.isRequired,
  socket: PropTypes.any.isRequired
}

export default InviteAsCollaborator