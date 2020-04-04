/* eslint-disable react/prop-types */
import React from 'react';

const Input = (props) => {
    let inputElement = null;

    const InputClasses = [ 'form-control', 'w-100' ];
    const selectClasses = [ 'custom-select', 'custom-select-lg' ]
if(props.elementType === 'input'){
    if(!props.invalid && props.touched){
        InputClasses.push('is-invalid');
    } else if (props.invalid && props.touched){
        InputClasses.push('is-valid');
    }
}else {
    if(!props.invalid && props.touched){
        selectClasses.push('is-invalid');
    } else if (props.invalid && props.touched){
        selectClasses.push('is-valid');
    }
}

    switch(props.elementType){
        case('input'):
        inputElement =  <input
         { ...props.elementConfig }
          className={ InputClasses.join(' ') } 
           value={ props.value }
            onChange={ props.changed } />

       break;

    case('textarea'):
    inputElement = (
        <textarea
            className={ InputClasses.join(' ') }
            { ...props.elementConfig }
            value={ props.value }
            onChange={ props.changed }></textarea>
    )
    break;

    case('select'):
    inputElement = (
        <select
            onChange={ props.changed }
            className={ selectClasses.join(' ') }
            defaultValue={ props.value }>
            {props.elementConfig.options.map(option => (
                <option selected={ option.selected || false } value={ option.value } key={ option.value }>
                    {option.displayValue}
                </option>
            ))}
        </select>
    )
    break;

    default:
    inputElement = <input
    { ...props.elementConfig }
     className={ InputClasses.join(' ') } 
      value={ props.value }
       onChange={ props.changed } />;
    }
    return(
        <div className="form-group">
            <label className="form-control-label">{props.label}</label>
            <div className="input-group input-group-merge">
                {inputElement}
                {/* <div class="input-group-append">
                <span class="input-group-text"><i data-feather="credit-card"></i></span>
            </div> */}
                {/* <div class="valid-feedback">
        Looks good!
      </div> */}
            </div>
        </div>
    );
};

export default Input;