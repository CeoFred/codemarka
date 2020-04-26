/* eslint-disable no-undef */
import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2';
import DropDown from './DropDown';

import './editor.css';
  require('codemirror/addon/fold/foldgutter.css');
 require('codemirror/addon/fold/foldcode.js');
  require('codemirror/addon/fold/foldgutter.js');
  require('codemirror/addon/fold/brace-fold.js');
  require('codemirror/addon/fold/xml-fold.js');
  require('codemirror/addon/fold/indent-fold.js');
  require('codemirror/addon/fold/markdown-fold.js');
  require('codemirror/addon/fold/comment-fold.js');
require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/addon/display/fullscreen.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/edit/closetag.js')
require('codemirror/addon/lint/lint.js');
require('codemirror/addon/lint/javascript-lint.js');
require('codemirror/addon/lint/json-lint.js');
require('codemirror/addon/lint/css-lint.js');
// require('codemirror/addon/lint/html-lint.js');
require('codemirror/addon/lint/lint.css');
require('codemirror/addon/scroll/annotatescrollbar.js');
require('codemirror/addon/search/matchesonscrollbar.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/match-highlighter.js');
require('codemirror/addon/dialog/dialog.css');
require('codemirror/addon/search/matchesonscrollbar.css');
require('codemirror/lib/codemirror.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/addon/dialog/dialog.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/search.js');
require('codemirror/addon/scroll/annotatescrollbar.js');
require('codemirror/addon/search/matchesonscrollbar.js');
require('codemirror/addon/search/jump-to-line.js');

export default function Editor(props) {

  const cssOptions = {
      mode: 'css',
      lineNumbers: true,
      theme: 'dracula',
      readOnly: props.readOnly ? false : 'nocursor',
      autofocus: true,
      pollInterval: 3000,
      lineWrapping: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
          'Ctrl-Q': function(cm) {
              cm.foldCode(cm.getCursor())
          },
          F11: function(cm) {
              cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc: function(cm) {
              if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          },
          'Alt-F': 'findPersistent'
      },
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      foldGutter: true,
      lint: true
  }
  
  const htmlOptions = {
      lineNumbers: true,
      mode: 'htmlmixed',
      theme: 'dracula',
      readOnly: props.readOnly ? false : 'nocursor',
      pollInterval: 3000,
      lineWrapping: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
          'Ctrl-Q': function(cm) {
              cm.foldCode(cm.getCursor())
          },
          F11: function(cm) {
              cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc: function(cm) {
              if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          },
          'Alt-F': 'findPersistent'

      },
      foldGutter: true,
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      lint: true
  }

  const jsOptions = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'dracula',
      readOnly: props.readOnly ? false : 'nocursor',
      pollInterval: 3000,
      lineWrapping: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
          'Ctrl-Q': function(cm) {
              cm.foldCode(cm.getCursor())
          },
          F11: function(cm) {
              cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          Esc: function(cm) {
              if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          },
          'Alt-F': 'findPersistent'
      },
      foldGutter: true,
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      lint: true
  }
  let editors ;

  const { files } = props;

  if(files){

 editors = files.map((f, i) => {
     
     if (f.file === 'css') {
         return (
             <div className="col-4 h-100 pl-0 pr-0" key={i}>
                 <div
                     style={{ zIndex: 99, width: '100%', position: 'absolute' }}
                     className="bg-dark-light p-2 m-0 text-white font-weight-bolder">
                     <span className="float-left">
                         {f.file.toUpperCase()}
                         {/* <DropDown
                             selected={props.dropDownSelect}
                             list={[
                                 { name: 'CSS', value: 'css' },
                                 { name: 'SCSS', value: 'scss' },
                                 { name: 'LESS', value: 'less' }
                             ]}
                             for={f.file}
                         /> */}
                     </span>

                     {/* <span className="float-right">
                         <i className="fas fa-plus-square"></i>
                     </span> */}
                 </div>

                 <CodeMirror
                     value={f.content}
                     options={cssOptions}
                     onChange={(e, ob, v) =>
                         props.handleEditorChange(e, ob, v, 'css')
                     }
                 />
             </div>
         )
     }

     if (f.file === 'html') {
         return (
             <div className="col-4 h-100 pl-0 pr-0" key={i}>
                 <div
                     style={{ zIndex: 99, width: '100%', position: 'absolute' }}
                     className="bg-dark-light p-2 m-0 text-white font-weight-bolder">
                     <span className="float-left">
                         {f.file.toUpperCase()}
                         {/* <DropDown
                             selected={props.dropDownSelect}
                             list={[
                                 { name: 'HTML', value: 'html' },
                                 { name: 'Markdown', value: 'md' }
                             ]}
                             for={f.file}
                         /> */}
                     </span>

                     {/* <span className="float-right">
                         <i className="fas fa-plus-square"></i>
                     </span> */}
                 </div>

                 <CodeMirror
                     value={f.content}
                     options={htmlOptions}
                     onChange={(e, ob, v) =>
                         props.handleEditorChange(e, ob, v, 'html')
                     }
                 />
             </div>
         )
     }

     if (f.file === 'js') {
         return (
             <div className="col-4 h-100 pl-0 pr-0" key={i}>
                 <div
                     style={{ zIndex: 99, width: '100%', position: 'absolute' }}
                     className="bg-dark-light p-2 m-0 text-white font-weight-bolder">
                     <span className="float-left">
                         {f.file.toUpperCase()}
                         {/* <DropDown
                             selected={props.dropDownSelect}
                             list={[
                                 { name: 'Javascript', value: 'JS' },
                                 { name: 'Typescript', value: 'TS' },
                                 { name: 'Coffee Script', value: 'CS' }
                             ]}
                             for={f.file}
                         /> */}
                     </span>

                     {/* <span className="float-right">
                         <i className="fas fa-plus-square"></i>
                     </span> */}
                 </div>
                 <CodeMirror
                     value={f.content}
                     options={jsOptions}
                     onChange={(e, ob, v) =>
                         props.handleEditorChange(e, ob, v, 'js')
                     }
                 />
             </div>
         )
     }
     return <div>No Editor</div>
 })

  }
 
    return (
        <div className="editors__container">
            <div className="row h-100 p-0 m-0">
                {editors}
            </div>
        </div>
    )
}
