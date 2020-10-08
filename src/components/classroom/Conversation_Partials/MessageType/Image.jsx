/** @format */

import React from 'react'
import PropTypes from 'prop-types'

function Text(props) {
    return (
        <div
                style={ {
                    height: '100px',
                    maxHeight: '100px',
                    maxWidth: '100%',
                } }
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
        </div>
    )
}

Text.propTypes = {
    message: PropTypes.isRequired,
}

export default Text
