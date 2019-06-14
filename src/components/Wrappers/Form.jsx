import React from 'react';

function Form(props) {
    return (
        <div className="login100-form validate-form">
        				<span className="login100-form-title p-b-37">
					{props.title}
				</span>

            {props.children}
        </div>
    )
}

export default Form
