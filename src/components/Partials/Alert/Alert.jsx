import React from 'react'

import Component from './Component';
import Types from "./Types";

export default function Alert(props) {
    switch (props.type) {
        case Types.success:
          return <Component type={props.type} message={props.children} title={props.title}/> 
        default:
          return <Component type='info' message={props.children} title={props.title}/> 
    }
}
