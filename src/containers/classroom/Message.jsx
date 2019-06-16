import React from 'react'

export default function Message(props) {
    let who;
    if(props.self ===  props.from){
        who = 'You'
    }else{
        who = props.from
    }

   if(props.from === 'server'){
    return (
        <div className="bo-cir s-message">
        <small><b>::</b></small>
        <br/>
        {props.content}
        <hr/>

        </div>
    )
   }else { return (
        <div>
        <small><b>{who}</b></small>
        <div className="bo-cir message">
        {props.content}
        </div>
            <hr/>
        </div>
        
     )
   }
}
