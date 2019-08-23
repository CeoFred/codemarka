import React from 'react'
import {Link} from 'react-router-dom';



 export default function Input(props) {
    const regular =  (
        <div class="form-group mb-4">
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <label class="form-control-label">{props.label}</label>
                    </div>
                   {props.isLoginPasswordInput ? (<div class="mb-2">
                      <Link
                        to="/auth/recover"
                        class="small text-muted text-underline--dashed border-primary"
                      >
                        Lost password?
                      </Link>
                   </div>) : ''
                   }
                  </div>
                  <div class="input-group input-group-merge">
                    {props.initialPrepend ?
                         (<div class="input-group-prepend">
                      <span class="input-group-text">
                         {props.initialPrependsvg}
                      </span>
                         </div>) : ''}
                    <input
                      type={props.type}
                      class="form-control"
                      id={props.id || ''}
                      placeholder={props.plaveholder}
                      onKeyUp={props.inputChange}
                      value={props.value}
                    />
                    {props.finalAppend ? <div class="input-group-append">
                      <span class="input-group-text">
                        <a
                          href="/#"
                          data-toggle="password-text"
                          data-target="#input-password"
                        >
                          {props.finalAppendsvg}
                        </a>
                      </span>
                    </div>: ''}
                  </div>
                </div>
                
    )
const checkbox = (

    <div class="my-4">
    <div class="custom-control custom-checkbox mb-3">
      <input type="checkbox" 
      class="custom-control-input" id="check-terms" />
       <label class="custom-control-label" for="check-terms">
           {props.children}
       </label>
       </div>
       </div>
)
    switch (props.fieldtype)  {
        case 'checkbox':
            return checkbox;
    
        default:
            return regular
    }
}
