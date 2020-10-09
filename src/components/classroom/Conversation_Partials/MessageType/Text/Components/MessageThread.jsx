/** @format */

import React, { useState, useEffect } from 'react'
import Modal from '../../../../../Partials/Modals/Modal'
import Input from '../../../../../Partials/Input/Input'
import Spinner from '../../../../../Partials/Preloader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../../../../store/actions/classRoom'
import * as actionType from '../../../../../../store/actions/Types'
import { convertToReadableDateFormat} from '../../../../../../utility/shared'
function FooterContent(props) {
    const [threadMessage, setThreadMessage] = useState('')

    function handleThreadMessageChanged(e) {
        const value = e.target.value
        setThreadMessage(value)
    }
    return (
        <div className="message_thread_input_container">
            <Input
                value={ threadMessage }
                shouldDisplay={ true }
                changed={ handleThreadMessageChanged }
                elementType="textarea"
                elementConfig={ {
                    resize: 'none',
                    placeholder: "Reply with ''❤''",
                    rows: 1,
                } }
            />
        </div>
    )
}

function MessageThread(props) {
    const style = {
        maxWidth: '31rem',
        borderRadius: 0,
    }

    return (
        <Modal
            style={ style }
            size="sm"
            footerContent={ <FooterContent { ...props } /> }
            title="Thread"
            targetid="thread_modal">
            {!props.threadState.loading && props.threadState.retrieved ? (
                <div className="thread_container">
                    <div className="thread_user_message_info">
                        <div className="thread_user_icon">
                            <img
                                src={ props.threadState.userInfo.image }
                                alt={ props.threadState.userInfo.username }
                            />
                        </div>
                        <div className="thread_user_name_date_message">
                            <div className="thread_user_container">
                                <span>
                                    @{props.threadState.userInfo.username}
                                </span>{' '}
                                <small>
                                    {convertToReadableDateFormat(
                                        props.threadState.timeSent,
                                        'h:mm A, Do MMMM YYYY'
                                    )}
                                </small>
                            </div>
                            <div className="thread_message_content">
                                {props.threadState.message}
                            </div>
                        </div>
                    </div>
                    <div className="thread_replies_container">
                        {props.threadState.messages &&
                        props.threadState.messages.length > 0
                            ? props.threadState.messages.map((message) => {
                                  return (
                                      <div
                                          className="thread_reply"
                                          key={ message.thread_id }>
                                          <div className="username">
                                              {message.username}{' '}
                                              <small> {message.time}</small>{' '}
                                          </div>
                                          <div className="message">
                                              {message.content}
                                          </div>
                                      </div>
                                  )
                              })
                            : ''}
                    </div>
                </div>
            ) : (
                <Spinner />
            )}

            <button
                type="button"
                data-toggle="modal"
                data-target="#thread_modal"
                id="thread_modal_button"
                hidden="true"></button>
        </Modal>
    )
}
const mapStateToProps = ({ classroom }) => {
    return {
        threadState: classroom.messageThread,
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        addMessageToThread: () => dispatch({ type: actionType.AUTO_AUTH_INIT }),
        fetchMessageThread: () =>
            dispatch({ type: actionType.MESSAGE_THREAD_FETCH_START }),
    }
}

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(MessageThread)
)
