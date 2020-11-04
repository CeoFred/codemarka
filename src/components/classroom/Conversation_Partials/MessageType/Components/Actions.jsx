import React,{ useState} from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionType from '../../../../../store/actions/Types'

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

  function addEmojiReaction(e){
      props.setShowEmoji(true)
  }

  return (
      <div
          className="message_actions"
          onMouseEnter={ props.keepShowingActions }
          id={ props.id }>
       
          <span onClick={ loadMessageThread }>
              <i className="fa fa-comment-dots"></i>
          </span>
          {/* <span onClick={ addEmojiReaction }>
              <i className="fa fa-smile-wink"></i>
          </span> */}
          {/* <span>
              <i className="fa fa-pencil-alt"></i>
          </span>

          <span>
              <i className="fa fa-trash-alt"></i>
          </span> */}
      </div>
  )
}

const matchDispatchToProps = (dispatch) => {
    return {
        setMessageThread: (data) =>
            dispatch({ type: actionType.SET_MESSAGE_THREAD, data }),
        setShowEmoji: () => dispatch({ type: actionType.SET_DISPLAYING_MESSAGE_REACTION_PICKER, status : true})
    }
}

export default withRouter(
    connect(null, matchDispatchToProps)(MessageActions)
)
