// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React, { useState, useEffect, useRef } from "react";

import { ControlledEditor as Editor} from "@monaco-editor/react";
import './monaco.css';

function CodemarkaEditor(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('html');
  const currentLanguageIndex = useRef(1);
  const readOnlyRef = useRef(props.readOnly);

  const mapLanguageToIndex = {
    0: 'css',
    1: 'html',
    2: 'js'
}
  const [value, setValue] = useState('');
 
  const handleEditorChange = (ev, value) => {
    setValue(value);
    props.handleEditorChange(ev,value,mapLanguageToIndex[currentLanguageIndex.current]);
  };

  useEffect(() => {
      if(props.files.length){
        setValue(props.files[currentLanguageIndex.current].content)
      }
  },[props.files])


  const config = {
    "acceptSuggestionOnCommitCharacter": true,
    "acceptSuggestionOnEnter": "on",
    "accessibilitySupport": "auto",
    "autoIndent": false,
    "automaticLayout": true,
    "codeLens": true,
    "colorDecorators": true,
    "contextmenu": true,
    "cursorBlinking": "blink",
    "cursorSmoothCaretAnimation": false,
    "cursorStyle": "line",
    "disableLayerHinting": false,
    "disableMonospaceOptimizations": false,
    "dragAndDrop": false,
    "fixedOverflowWidgets": false,
    "folding": true,
    "foldingStrategy": "auto",
    "fontLigatures": false,
    "formatOnPaste": false,
    "formatOnType": false,
    "hideCursorInOverviewRuler": false,
    "highlightActiveIndentGuide": true,
    "links": true,
    "mouseWheelZoom": false,
    "multiCursorMergeOverlapping": true,
    "multiCursorModifier": "alt",
    "overviewRulerBorder": true,
    "overviewRulerLanes": 2,
    "quickSuggestions": true,
    "quickSuggestionsDelay": 100,
    "readOnly": readOnlyRef.current,
    "renderControlCharacters": false,
    "renderFinalNewline": true,
    "renderIndentGuides": true,
    "renderLineHighlight": "all",
    "renderWhitespace": "none",
    "revealHorizontalRightPadding": 30,
    "roundedSelection": true,
    "rulers": [],
    "scrollBeyondLastColumn": 5,
    "scrollBeyondLastLine": true,
    "selectOnLineNumbers": true,
    "selectionClipboard": true,
    "selectionHighlight": true,
    "showFoldingControls": "mouseover",
    "smoothScrolling": false,
    "suggestOnTriggerCharacters": true,
    "wordBasedSuggestions": true,
    "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    "wordWrap": "off",
    "wordWrapBreakAfterCharacters": "\t})]?|&,;",
    "wordWrapBreakBeforeCharacters": "{([+",
    "wordWrapBreakObtrusiveCharacters": ".",
    "wordWrapColumn": 80,
    "wordWrapMinified": true,
    "wrappingIndent": "none"
  }

  

  function handleChangeLanguageTab(e,tab){
    setValue(props.files[tab].content);
    currentLanguageIndex.current = tab;
    setCurrentLanguage(mapLanguageToIndex[tab] === 'js' ? 'javascript' : mapLanguageToIndex[tab]);
  }

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  return (
    <>
         <div className="editors__container">
             <div className="row h-100 p-0 m-0">
                 <div className="editor_tabs">
                     <span className={`html_tab ${currentLanguageIndex.current === 1 ? 'active_tab' : ''}`} onClick={(e) => handleChangeLanguageTab(e,1)}><i className="fab fa-html5" style={{color:'#c77d31'}}></i> index.html
                     
                         {props.readOnly ? (
                             <li title="html file actions" className="nav-item dropdown">
                                 <span
                                     className="nav-link nav-link-icon"
                                     id="navbar-success_dropdown_css_uploader"
                                     role="button"
                                     data-toggle="dropdown"
                                     aria-haspopup="true"
                                     aria-expanded="false">
                                     <i className="fa fa-ellipsis-v"></i>
                                 </span>
                                 <div
                                     style={{ cursor: 'pointer' }}
                                     className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbar-success_dropdown_css_uploader">
                                     <span
                                         className="dropdown-item"
                                         onClick={(e) => props.uploadFileFromSystem(e, 'html')}>
                                 <i className="fa fa-file-upload"></i> Upload File
                                </span>
                                <span className="dropdown-item" onClick={(e) => props.clearEditorrContent(e,'html')}>
                                  <i className="fa fa-trash"></i>  Clear
                                </span>
                                
                                 </div>
                             </li>
                         ) : ''}
                     </span>
                     <span className={`css_tab ${currentLanguageIndex.current === 0 ? 'active_tab' : ''}`} onClick={(e) => handleChangeLanguageTab(e,0)}><i className="fab fa-css3-alt" style={{color:'cornflowerblue'}}></i> index.css
                     {props.readOnly ? (
                             <li title="css file actions" className="nav-item dropdown">
                                 <span
                                     className="nav-link nav-link-icon"
                                     id="navbar-success_dropdown_css_uploader"
                                     role="button"
                                     data-toggle="dropdown"
                                     aria-haspopup="true"
                                     aria-expanded="false">
                                     <i className="fa fa-ellipsis-v"></i>
                                 </span>
                                 <div

                                     style={{ cursor: 'pointer' }}
                                     className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbar-success_dropdown_css_uploader">
                                     <span
                                         className="dropdown-item"
                                         href="/#"
                                         onClick={(e) => props.uploadFileFromSystem(e, 'css')}>
                                        <i className="fa fa-file-upload"></i> Upload File
                                </span>
                                <span className="dropdown-item" href="/#" onClick={(e) => props.clearEditorrContent(e,'css')}>
                                  <i className="fa fa-trash"></i>  Clear
                                </span>
                                <span className="dropdown-item" href="/#" onClick={(e) => props.addExternalCDN(e,'css')}>
                                  <i className="fa fa-link"></i> Add External CDN
                                </span>
                                
                                


                                 </div>
                             </li>
                         ) : ''}
                     </span>
                     <span className={`javascript-tab ${currentLanguageIndex.current === 2 ? 'active_tab' : ''}`} onClick={(e) => handleChangeLanguageTab(e,2)}><i className="fab fa-js-square" style={{color:'#f5f555'}}></i> index.js
                     
//                          {props.readOnly ? (
                             <li title="javascript file actions" className="nav-item dropdown">
                                 <span
                                     className="nav-link nav-link-icon"
                                     id="navbar-success_dropdown_javascript_uploader"
                                     role="button"
                                     data-toggle="dropdown"
                                     aria-haspopup="true"
                                     aria-expanded="false">
                                     <i className="fa fa-ellipsis-v"></i>
                                 </span>
                                 <div
                                     style={{ cursor: 'pointer' }}
                                     className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbar-success_dropdown_javascript_uploader">
                                     <a
                                         
                                         className="dropdown-item"
                                         href="/#"
                                         onClick={(e) => props.uploadFileFromSystem(e, 'js')}>
                                <i className="fa fa-file-upload"></i> Upload File
                                </a>
                                <div className="dropdown-item" onClick={(e) => props.clearEditorrContent(e,'js')}>
                                  <i className="fa fa-trash"></i>  Clear
                                </div>
                                <div className="dropdown-item" href="/#" onClick={(e) => props.addExternalCDN(e,'js')}>

                                  <i className="fa fa-link"></i>  Add External CDN
                                </div>
                                

                                 </div>
                             </li>
                         ) : ''}
                     </span>

                 </div>
                 <input type="file" id="editor_file_uploader_input" className="d-none"/>

                 <Editor
        theme="dark"    
        options={config}
        onChange={handleEditorChange}
        language={currentLanguage}
        loading={(<i className="fa fa-file-code fa-3x"></i>)}
        value={value}
        editorDidMount={handleEditorDidMount}
      />
             </div>
       </div>
      
    </>
  );
}


export default CodemarkaEditor;



// /* eslint-disable no-undef */
// import React from 'react'
// import { UnControlled as CodeMirror } from 'react-codemirror2';
// // import DropDown from './DropDown';

// import './editor.css';
// require('codemirror/mode/css/css');
// require('codemirror/mode/javascript/javascript');
// require('codemirror/mode/htmlmixed/htmlmixed');
// require('codemirror/addon/display/fullscreen.js');
// require('codemirror/addon/edit/closebrackets.js');
// require('codemirror/addon/edit/closetag.js')
// require('codemirror/addon/lint/lint.js');
// require('codemirror/addon/lint/javascript-lint.js');
// require('codemirror/addon/lint/json-lint.js');
// require('codemirror/addon/lint/css-lint.js');
// // require('codemirror/addon/lint/html-lint.js');
// require('codemirror/addon/lint/lint.css');
// require('codemirror/addon/scroll/annotatescrollbar.js');
// require('codemirror/addon/search/matchesonscrollbar.js');
// require('codemirror/addon/search/searchcursor.js');
// require('codemirror/addon/search/match-highlighter.js');
// require('codemirror/addon/dialog/dialog.css');
// require('codemirror/addon/search/matchesonscrollbar.css');
// require('codemirror/lib/codemirror.js');
// require('codemirror/addon/dialog/dialog.js');
// require('codemirror/addon/scroll/annotatescrollbar.js');
// require('codemirror/addon/search/matchesonscrollbar.js');

// export default function Editor(props) {

    
//   const cssOptions = {
//       mode: 'css',
//       lineNumbers: true,
//       theme: 'dracula',
//       readOnly: props.readOnly ? false : 'nocursor',
//       autofocus: true,
//       pollInterval: 3000,
//       lineWrapping: true,
//       autoCloseBrackets: true,
//       autoCloseTags: true,
//       extraKeys: {
//           'Ctrl-Q': function(cm) {
//               cm.foldCode(cm.getCursor())
//           },
//           F11: function(cm) {
//               cm.setOption('fullScreen', !cm.getOption('fullScreen'))
//           },
//           Esc: function(cm) {
//               if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
//           },
//           'Alt-F': 'findPersistent'
//       },
//       highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
//       foldGutter: true,
//       lint: true
//   }
  
//   const htmlOptions = {
//       lineNumbers: true,
//       mode: 'htmlmixed',
//       theme: 'dracula',
//       readOnly: props.readOnly ? false : 'nocursor',
//       pollInterval: 3000,
//       lineWrapping: true,
//       autoCloseBrackets: true,
//       autoCloseTags: true,
//       extraKeys: {
//           'Ctrl-Q': function(cm) {
//               cm.foldCode(cm.getCursor())
//           },
//           F11: function(cm) {
//               cm.setOption('fullScreen', !cm.getOption('fullScreen'))
//           },
//           Esc: function(cm) {
//               if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
//           },
//           'Alt-F': 'findPersistent'

//       },
//       foldGutter: true,
//       highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
//       lint: true
//   }

//   const jsOptions = {
//       lineNumbers: true,
//       mode: 'javascript',
//       theme: 'dracula',
//       readOnly: props.readOnly ? false : 'nocursor',
//       pollInterval: 3000,
//       lineWrapping: true,
//       autoCloseBrackets: true,
//       autoCloseTags: true,
//       extraKeys: {
//           'Ctrl-Q': function(cm) {
//               cm.foldCode(cm.getCursor())
//           },
//           F11: function(cm) {
//               cm.setOption('fullScreen', !cm.getOption('fullScreen'))
//           },
//           Esc: function(cm) {
//               if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
//           },
//           'Alt-F': 'findPersistent'
//       },
//       foldGutter: true,
//       highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
//       lint: true
//   }
//   let editors ;

//   const { files } = props;

//   if(files){

//  editors = files.map((f, i) => {
     
//      if (f.file === 'css') {
//          return (
//              <div className="col-md-4 col-12 h-100 pl-0 pr-0" key={i}>
//                  <div
//                      style={{ zIndex: 99, width: '100%', position: 'absolute' }}
//                      className="bg-dark-light p-2 m-0 text-white font-weight-bolder">
//                      <span className="float-left">
//                          {f.file.toUpperCase()}
//                          {/* <DropDown
//                              selected={props.dropDownSelect}
//                              list={[
//                                  { name: 'CSS', value: 'css' },
//                                  { name: 'SCSS', value: 'scss' },
//                                  { name: 'LESS', value: 'less' }
//                              ]}
//                              for={f.file}
//                          /> */}
//                      </span>

//                      <span className="float-right">
//                          {props.readOnly ? (
//                              <li title="css file actions" className="nav-item dropdown">
//                                  <span
//                                      className="nav-link nav-link-icon"
//                                      id="navbar-success_dropdown_css_uploader"
//                                      role="button"
//                                      data-toggle="dropdown"
//                                      aria-haspopup="true"
//                                      aria-expanded="false">
//                                      <i className="fa fa-ellipsis-v"></i>
//                                  </span>
//                                  <div

//                                      style={{ cursor: 'pointer' }}
//                                      className="dropdown-menu dropdown-menu-right"
//                                      aria-labelledby="navbar-success_dropdown_css_uploader">
//                                      <span
//                                          className="dropdown-item"
//                                          href="/#"
//                                          onClick={(e) => props.uploadFileFromSystem(e, 'css')}>
//                                         <i className="fa fa-file-upload"></i> Upload File
//                                 </span>
//                                 <span className="dropdown-item" href="/#" onClick={(e) => props.clearEditorrContent(e,'css')}>
//                                   <i className="fa fa-trash"></i>  Clear
//                                 </span>
//                                 <span className="dropdown-item" href="/#" onClick={(e) => props.addExternalCDN(e,'css')}>
//                                   <i className="fa fa-link"></i> Add External CDN
//                                 </span>
                                
                                


//                                  </div>
//                              </li>
//                          ) : ''}

//                      </span>
//                  </div>

//                  <CodeMirror
//                      value={f.content}
//                      options={cssOptions}
//                      onChange={(e, ob, v) =>
//                          props.handleEditorChange(e, ob, v, 'css')
//                      }
//                  />
//              </div>
//          )
//      }

//      if (f.file === 'html') {
//          return (
//              <div className="col-md-4 col-12 h-100 pl-0 pr-0" key={i}>
//                  <div
//                      style={{ zIndex: 99, width: '100%', position: 'absolute' }}
//                      className="bg-dark-light p-2 m-0 text-white font-weight-bolder">
//                      <span className="float-left">
//                          {f.file.toUpperCase()}
//                          {/* <DropDown
//                              selected={props.dropDownSelect}
//                              list={[
//                                  { name: 'HTML', value: 'html' },
//                                  { name: 'Markdown', value: 'md' }
//                              ]}
//                              for={f.file}
//                          /> */}
//                      </span>

//                      <span className="float-right">
                         
//                          {props.readOnly ? (
//                              <li title="html file actions" className="nav-item dropdown">
//                                  <span
//                                      className="nav-link nav-link-icon"
//                                      id="navbar-success_dropdown_css_uploader"
//                                      role="button"
//                                      data-toggle="dropdown"
//                                      aria-haspopup="true"
//                                      aria-expanded="false">
//                                      <i className="fa fa-ellipsis-v"></i>
//                                  </span>
//                                  <div
//                                      style={{ cursor: 'pointer' }}
//                                      className="dropdown-menu dropdown-menu-right"
//                                      aria-labelledby="navbar-success_dropdown_css_uploader">
//                                      <span
//                                          className="dropdown-item"
//                                          onClick={(e) => props.uploadFileFromSystem(e, 'html')}>
//                                  <i className="fa fa-file-upload"></i> Upload File
//                                 </span>
//                                 <span className="dropdown-item" onClick={(e) => props.clearEditorrContent(e,'html')}>
//                                   <i className="fa fa-trash"></i>  Clear
//                                 </span>
                                
//                                  </div>
//                              </li>
//                          ) : ''}
//                      </span>
//                  </div>

//                  <CodeMirror
//                      value={f.content}
//                      options={htmlOptions}
//                      onChange={(e, ob, v) =>
//                          props.handleEditorChange(e, ob, v, 'html')
//                      }
//                  />
//              </div>
//          )
//      }

//      if (f.file === 'js') {
//          return (
//              <div className="col-md-4 col-12 h-100 pl-0 pr-0" key={i}>
//                  <div
//                      style={{ zIndex: 99, width: '100%', position: 'absolute' }}
//                      className="bg-dark-light p-2 m-0 text-white font-weight-bolder">
//                      <span className="float-left">
//                          {f.file.toUpperCase()}
//                          {/* <DropDown
//                              selected={props.dropDownSelect}
//                              list={[
//                                  { name: 'Javascript', value: 'JS' },
//                                  { name: 'Typescript', value: 'TS' },
//                                  { name: 'Coffee Script', value: 'CS' }
//                              ]}
//                              for={f.file}
//                          /> */}
//                      </span>

//                      <span className="float-right">
                         
//                          {props.readOnly ? (
//                              <li title="javascript file actions" className="nav-item dropdown">
//                                  <span
//                                      className="nav-link nav-link-icon"
//                                      id="navbar-success_dropdown_javascript_uploader"
//                                      role="button"
//                                      data-toggle="dropdown"
//                                      aria-haspopup="true"
//                                      aria-expanded="false">
//                                      <i className="fa fa-ellipsis-v"></i>
//                                  </span>
//                                  <div
//                                      style={{ cursor: 'pointer' }}
//                                      className="dropdown-menu dropdown-menu-right"
//                                      aria-labelledby="navbar-success_dropdown_javascript_uploader">
//                                      <a
                                         
//                                          className="dropdown-item"
//                                          href="/#"
//                                          onClick={(e) => props.uploadFileFromSystem(e, 'js')}>
//                                 <i className="fa fa-file-upload"></i> Upload File
//                                 </a>
//                                 <div className="dropdown-item" onClick={(e) => props.clearEditorrContent(e,'js')}>
//                                   <i className="fa fa-trash"></i>  Clear
//                                 </div>
//                                 <div className="dropdown-item" href="/#" onClick={(e) => props.addExternalCDN(e,'js')}>

//                                   <i className="fa fa-link"></i>  Add External CDN
//                                 </div>
                                

//                                  </div>
//                              </li>
//                          ) : ''}
//                      </span>
//                  </div>
//                  <CodeMirror
//                      value={f.content}
//                      options={jsOptions}
//                      onChange={(e, ob, v) =>
//                          props.handleEditorChange(e, ob, v, 'js')
//                      }
//                  />
//              </div>
//          )
//      }
//      return <div>No Editor</div>
//  })

//   }
 
//     return (
//         <div className="editors__container">

//             <div className="row h-100 p-0 m-0">
//                 <input type="file" id="editor_file_uploader_input" className="d-none"/>
//                 {editors}
//             </div>
//         </div>
//     )
// }
