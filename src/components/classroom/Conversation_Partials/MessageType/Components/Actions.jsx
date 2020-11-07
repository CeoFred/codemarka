import React,{ useState} from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionType from '../../../../../store/actions/Types'

 function MessageActions(props) {

  async function loadMessageThread(e) {
    // dispatch action to fetch message thread
   await props.setMessageThread({
      messageId:props.id,
      classroomId: props.match.params.classroom
    });
   await document.getElementById('thread_modal_button').click()

  }

//   function addEmojiReaction(e){
//       props.setShowEmoji(true)
//   }

  return (
      <div
          className="message_actions"
          onMouseEnter={ props.keepShowingActions }
          id={ props.id }>
          <span
              onClick={ loadMessageThread }
              style={ { marginLeft: 5, marginRight: 5 } }
              title="Show Thread">
              <i className="fa fa-comment-dots"></i>
          </span>
          {/* <span onClick={ addEmojiReaction }>
              <i className="fa fa-smile-wink"></i>
          </span> */}
          {props.senderid === props.userId && (
              <span>
                  <span
                      style={ { marginLeft: 5, marginRight: 5 } }
                      title="Edit Message">
                      <i className="fa fa-pencil-alt"></i>
                  </span>
                  <span
                      style={ { marginLeft: 5, marginRight: 5 } }
                      title="Delete Message">
                      <i className="fa fa-trash-alt"></i>
                  </span>
              </span>
          )}
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
const mapStateToProps = ({ auth }) => {
    return {
        userId: auth.user.accountid,
    }
}
export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(MessageActions)
)
