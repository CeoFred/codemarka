/** @format */

import React, { useState,useEffect } from 'react'
import Picker from 'emoji-picker-react'
import './style.css'
const EmojiPicker = (props) => {
    const [displaying, setdisplaying] = useState('none')

    useEffect(() => {
       setdisplaying(props.shouldDisplay ? 'block' : 'none')
    }, [props.shouldDisplay])

    const onEmojiClick = (event, emojiObject) => {
        props.handleInputChange(emojiObject)
    }

    return (
        <div className="picker-container" style={ { display: displaying } }>
            <Picker onEmojiClick={ onEmojiClick } disableSearchBar={ true } />
        </div>
    )
}

export default EmojiPicker;