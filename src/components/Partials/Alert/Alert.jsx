import React from 'react'

import Component from './Component';
import Types from "./Types";

export default function Alert(props) {
    switch (props.type) {
        case Types.success:
          return <Component ref={props.ref} type={Types.success} display={props.display} message={props.children} title={props.title}/> 
        case Types.danger:
          return <Component ref={props.ref} type={Types.danger} display={props.display} message={props.children} title={props.title}/>
        default:
          return <Component ref={props.ref} type='info' display={props.display} message={props.children} title={props.title}/> 
    }
}
