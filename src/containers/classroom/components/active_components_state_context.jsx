import React, { useState, createContext } from "react";


export const ActiveComponentsStateContext = createContext(null);

const ContextWrapper = ({ children }) => {
  const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const toggleMoreOptionsMenu = () => setMoreOptionsMenu(moreOptionsMenu => !moreOptionsMenu);
  const toggleEmojiPicker = () => setEmojiPicker(emojiPicker => !emojiPicker);

  return (
    <ActiveComponentsStateContext.Provider value={{
      moreOptionsMenu,
      emojiPicker,
      toggleMoreOptionsMenu,
      toggleEmojiPicker
    }}>
      {children}
    </ActiveComponentsStateContext.Provider>
  )
}

export default ContextWrapper;