import React from 'react'
import { UnControlled as CodeMirror } from "react-codemirror2";
// import "./editor.css";

require("codemirror/mode/css/css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/php/php");



export default function Editor(props) {
    return (<CodeMirror
        value={props.value}
        options={props.options}
        onChange={props.change}
      />
    )
}
