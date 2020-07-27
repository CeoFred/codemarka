import React,{ useRef, Fragment, useState, useEffect } from 'react'
import TextArea from '../../../Partials/Input/Input';
import { ControlledEditor as Editor } from '@monaco-editor/react'

import './style.css';

function CodeBlockModal(props){

const socketConnection = useRef(props.socket);
const [codeblock,setCodeBlock] = useState('')
useEffect(() => {
    socketConnection.current = props.socket;
},[props.socket]);


const handleCodeBlockInputChnage = (e,v) => {
    e.preventDefault();
    setCodeBlock(v);
}

const config = {
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: 'on',
  accessibilitySupport: 'auto',
  autoIndent: false,
  automaticLayout: true,
  codeLens: true,
  colorDecorators: true,
  contextmenu: true,
  cursorBlinking: 'blink',
  cursorSmoothCaretAnimation: false,
  cursorStyle: 'line',
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  dragAndDrop: false,
  fixedOverflowWidgets: false,
  folding: true,
  foldingStrategy: 'auto',
  fontLigatures: true,
  formatOnPaste: true,
  formatOnType: true,
  hideCursorInOverviewRuler: false,
  highlightActiveIndentGuide: true,
  links: true,
  mouseWheelZoom: false,
  multiCursorMergeOverlapping: true,
  multiCursorModifier: 'alt',
  overviewRulerBorder: true,
  overviewRulerLanes: 2,
  quickSuggestions: true,
  quickSuggestionsDelay: 100,
  readOnly: false,
  renderControlCharacters: false,
  renderFinalNewline: true,
  renderIndentGuides: true,
  renderLineHighlight: 'all',
  renderWhitespace: 'none',
  revealHorizontalRightPadding: 30,
  roundedSelection: true,
  rulers: [],
  scrollBeyondLastColumn: 5,
  scrollBeyondLastLine: true,
  selectOnLineNumbers: true,
  selectionClipboard: true,
  selectionHighlight: true,
  showFoldingControls: 'mouseover',
  smoothScrolling: false,
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: true,
  wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
  wordWrap: 'off',
  wordWrapBreakAfterCharacters: '\t})]?|&,;',
  wordWrapBreakBeforeCharacters: '{([+',
  wordWrapBreakObtrusiveCharacters: '.',
  wordWrapColumn: 80,
  wordWrapMinified: true,
  wrappingIndent: 'none',
}

return (
        <Fragment>
<button type="button" class="d-none" data-toggle="modal" id="codeblockModal" data-target=".code-blocks-modal">..</button>

<div class="modal fade code-blocks-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm" style={{display:'flex',height:'80%',alignItems:'center',justifyContent:'center'}}>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h6" id="mySmallModalLabel">Add Code</h5>
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style={{height:'400px!important'}}>
  <Editor 
                                  theme="dark"
                                  options={config}
                                  height={'400px'}
                                  width={'300px'}
                                  onChange={handleCodeBlockInputChnage}
                                  // language={currentLanguage}
                                  
                                  value={''}
  />
      </div>
    </div>
  </div>
  </div>
</Fragment>

)
}

export default CodeBlockModal;