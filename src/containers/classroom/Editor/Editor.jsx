import React from 'react'
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./editor.css";

require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");



export default function Editor(props) {
    return (<CodeMirror
        value={props.value}
        options={props.options}
        onChange={props.change}
      />
    )
}
