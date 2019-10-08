import React from 'react'

import Component from './Component';
import Types from "./Types";

export default function Alert(props) {
    switch (props.type) {
        case Types.success:
          return <Component type={Types.success} display={props.display} message={props.children} title={props.title}/> 
        case Types.error:
          return <Component type={Types.error} display={props.display} message={props.children} title={props.title}/>
        default:
          return <Component type='info' display={props.display} message={props.children} title={props.title}/> 
    }
}
