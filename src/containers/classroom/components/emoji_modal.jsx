import React, { useContext } from 'react'
import { ActiveComponentsStateContext } from './active_components_state_context';
import 'emoji-mart/css/emoji-mart.css';

const EmojiModal = ({ children }) => {
  const emojiModal = React.useRef(null);
  const { emojiPicker, toggleEmojiPicker } = useContext(ActiveComponentsStateContext);

  const handleClick = () => {
    window.onclick = event => {
      if (event.target == emojiModal.current) {
        toggleEmojiPicker()
      }
    }
  }
  return (
    <>
      {
        emojiPicker ?
          <div onClick = {handleClick} className="emoji-modal">
            <style>
              {`
                .emoji-modal {
                  position:fixed;
                  z-index: 100;
                  top:15%;
                  width:100%;
                }
              `}
            </style>
            <div ref={emojiModal} className="emoji-modal-sub-cont">
              {children}
            </div>
          </div> :
          null
      }
    </>
  )
}
export default EmojiModal;