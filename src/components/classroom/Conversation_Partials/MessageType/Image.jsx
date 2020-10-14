/** @format */

import React,{ useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionType from '../../../../store/actions/Types'
import MessageActions from './Components/Actions'
import ThreadReplies from './Components/ThreadReplies'

function ImageMessage(props) {
    const { isThread, isDeleted, msgId, by, thread } = props.message

    const [showAction, setShowingAction] = useState(false)
  function handleShowThread(e) {
      e.preventDefault()
      document.getElementById('thread_modal_button').click()
      props.setMessageThread({
          messageId: msgId,
          userId: props.userId,
          classroomId: props.match.params.classroom,
      })
  }
    if (isDeleted)
        return <i className="deleted_message">Message was deleted </i> 

    return (
        <div
            onMouseLeave={ (e) => setShowingAction(false) }
            onMouseEnter={ (e) => setShowingAction(true) }
            style={ {
                height: '100px',
                maxHeight: '100px',
                maxWidth: '100%',
            } }
            className="main_message_container"
            id={ props.message.msgId }>
            <img
                    src={ props.message.result.secure_url }
                    alt={ props.message.result.public_id }
                    title={ 'Image' }
                    style={ {
                        width: '100%',
                        cursor: 'pointer',
                        objectFit: 'cover',
                        height: '100%',
                    } }
                    onClick={ (e) =>
                        props.handleImagePreview(
                            e,
                            props.message.result.secure_url
                        )
                    }
                />

            {showAction ? (
                <MessageActions
                    keepShowingActions={ (e) => setShowingAction(true) }
                    id={ msgId }
                    userId={ by }
                />
            ) : (
                ''
            )}
            {isThread ? (
                <ThreadReplies
                    msgId={ msgId }
                    showThread={ handleShowThread }
                    thread={ thread }
                    { ...props }
                />
            ) : (
                ''
            )}
        </div>
    )
}

ImageMessage.propTypes = {
    message: PropTypes.isRequired,
}

const matchDispatchToProps = (dispatch) => {
    return {
        setMessageThread: (data) =>
            dispatch({ type: actionType.SET_MESSAGE_THREAD, data }),
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        userId: auth.user.accountid,
    }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ImageMessage))