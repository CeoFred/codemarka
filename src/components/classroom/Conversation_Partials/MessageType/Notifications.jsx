/** @format */

import React from 'react'
import PropTypes from 'prop-types'

function Text(props) {
    if (props.message.for === props.user) {
                    return (
                        <div
                            className="message_extra"
                            id={ props.message.msgId }>
                            You
                            {props.message.type === 'sLeft'
                                ? ' left'
                                : ' Joined'}
                        </div>
                    )
                }
                return (
                    <div
                        className="message_extra"
                        id={ props.message.msgId }>
                        {props.message.name}
                        {props.message.type === 'sLeft' ? ' left' : ' Joined'}
                    </div>
                )
}

Text.propTypes = {
    message: PropTypes.isRequired,
}

export default Text
