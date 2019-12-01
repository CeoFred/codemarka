import React from 'react'
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./editor.css";

require("codemirror/mode/css/css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/php/php");


const cssOptions = {
  mode : 'css',
  lineNumbers: true,
  theme: 'dracula',
}

const htmlOptions = {
  lineNumbers: true,
  mode : 'htmlmixed',
  theme: 'dracula',
}


export default function Editor(props) {

  let editors ;

  const {files} = props;
  editors = files.map((f,i) => {

    if(f.file === 'css'){
      return (<div className="col-6 h-100vh pl-0 pr-0" key={i}>
        <CodeMirror  
        value={f.content}
         options={cssOptions} 
         
        onChange={(e,ob,v) => props.handleEditorChange(e,ob,v,'css')}/>
        </div>)
    }

    if(f.file === 'html'){
      return (<div className="col-6 h-100vh pl-0 pr-0" key={i}>
        <CodeMirror  
        value={f.content}
         options={htmlOptions} 
         onChange={(e,ob,v) => props.handleEditorChange(e,ob,v,'html')}
         />
        </div>)
    }
    return (<div>No Editor</div>)
  })
    return (
      <div className="editors__container">
      <div className="row h-100">
        {editors}
      </div>
      </div>
    )
}
