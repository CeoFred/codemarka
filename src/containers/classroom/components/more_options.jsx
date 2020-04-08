import React, { useContext } from 'react';
import { ActiveComponentsStateContext } from './active_components_state_context';
import "./more_options.css";


const MoreOptions = () => {
  const { moreOptionsMenu, toggleEmojiPicker } = useContext(ActiveComponentsStateContext);

  return (
    <>
      {
        moreOptionsMenu ?
          (
            <div className="more-options">
              <i
                onClick={toggleEmojiPicker} className="far fa-smile-beam emoji-picker"
                data-toggle="modal"
                data-target="#emoji_modal_cont"
                title="open emoji picker"
              ></i>
            </div>
          ) :
          null
      }
    </>
  );
}

export default MoreOptions;