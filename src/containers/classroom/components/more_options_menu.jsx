import React, { useContext } from "react";
import { ActiveComponentsStateContext } from './active_components_state_context';

const MoreOptionsMenu = () => {

  const { moreOptionsMenu, toggleMoreOptionsMenu } = useContext(ActiveComponentsStateContext);

  return (
    <div onClick={toggleMoreOptionsMenu} className="more-options-menu">
      <span>
        {
          moreOptionsMenu ?
            <i className="fa fa-times"></i> :
            <i className="fas fa-ellipsis-v"></i>
        }
      </span>

    </div>
  )
}

export default MoreOptionsMenu;