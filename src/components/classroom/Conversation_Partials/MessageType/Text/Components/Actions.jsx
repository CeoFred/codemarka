import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import * as actions from '../../../../../../store/actions/classRoom'
import * as actionType from '../../../../../../store/actions/Types'

 function MessageActions(props) {

  function loadMessageThread(e) {
    // dispatch action to fetch message thread
    document.getElementById('thread_modal_button').click()
    props.setMessageThread({
      messageId:props.id,
      userId: props.userId,
      classroomId: props.match.params.classroom
    });
  }

  return (
      <div
          className="message_actions"
          onMouseEnter={ props.keepShowingActions }
          id={ props.id }>
          <span
              onClick={ loadMessageThread }>
              <i className="fa fa-comment-dots"></i>
          </span>
          <span>
              <i className="fa fa-smile-wink"></i>
          </span>
          <span>
              <i className="fa fa-ellipsis-v"></i>
          </span>
      </div>
  )
}

const matchDispatchToProps = (dispatch) => {
    return {
        setMessageThread: (data) =>
            dispatch({ type: actionType.SET_MESSAGE_THREAD,data })
    }
}

export default withRouter(
    connect(null, matchDispatchToProps)(MessageActions)
)
