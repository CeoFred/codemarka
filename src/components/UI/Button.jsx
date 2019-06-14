
import React from 'react'

export default function Button(props) {
    return (
        <>
        <button type={props.type} onClick={props.submit} className="login100-form-btn">
        {props.children}  
        </button>
        </>
    )
}
