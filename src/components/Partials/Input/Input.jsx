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
                <option value={ option.value } key={ option.value }>
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
    if (props.shouldDisplay) {
        return <div className="form-group">
            <label className="form-control-label">{props.label}{props.validation && props.validation.required ? (<span className="text-danger pl-2">*   </span>) : ''}</label>
            <div className="input-group input-group-merge">
                {inputElement}

                <div class="form-text text-muted mt-2">
                    <small>{props.elementConfig.inputhelpertext}</small>
                </div>
            </div>
        </div>
    } else return (<React.Fragment></React.Fragment>)
};

export default Input;