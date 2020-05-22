/** @format */

import React, { useState } from 'react'
import Button from '../../../Partials/Button'
import Input from '../../../Partials/Input/Input'
import Spinner from '../../../Partials/Preloader'

const JavascripTab = (props) => {
    const [state, setState] = useState({
        controls: {
            preprocessor: {
                label: 'Javascript Preprocessor',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 0,
                            displayValue: 'None',
                        },
                        {
                            value: 'TS',
                            displayValue: 'Typescript',
                        }
                    ],
                },
                value: 0,
            },
        },
        scontrols: {
            externalJs: {
                elementConfig: {
                    placeholder: 'https://somesite.com/script/index.js',
                },
                value: '',
                elementType: 'text',
            },
        },
        formisValid: false,
        formisSubmitted: props.loading ? true : false,
        formErrorMessage: false,
        formErrored: false,
    })
    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...state.controls,
            [controlName]: {
                ...state.controls[controlName],
                value: event.target.value,
                touched: true,
            },
        }

        setState({ ...state, controls: updatedControls })
        // console.log(updatedControls);
    }
    const submitHandler = (event) => {
        event.preventDefault()
        const formisSubmitted = true
        setState({ ...state, formisSubmitted })

        const formData = {}

        if (state.formisValid) {
            for (const formElementIdentifier in state.controls) {
                formData[formElementIdentifier] =
                    state.controls[formElementIdentifier].value
            }
            // eslint-disable-next-line no-undef
            props.onCreate(formData)
        } else {
            setState({
                ...state,
                alertType: 'error',
                formErrored: true,
                formErrorMessage:
                    'Form Validation Failed, please check inputs and try again',
            })
            return false
        }
    }

    const formElementArray = []
    for (const key in state.controls) {
        formElementArray.push({
            id: key,
            config: state.controls[key],
        })
    }
    const form = (
        <form onSubmit={submitHandler}>
            {formElementArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    elementType={formElement.config.elementType}
                    value={formElement.config.value}
                    changed={(event) =>
                        inputChangeHandler(event, formElement.id)
                    }
                    shouldDisplay={true}

                    label={formElement.config.label}
                />
            ))}

            <div className="mt-2 mb-2">
                <b>Add External Scripts</b>
                <p>
                    Any URL's (comma seperated) added here will be added as
                    links in their order, and before the JS in the editor.
                </p>
                <Input
                    key="external-js"
                    elementConfig={state.scontrols.externalJs.elementConfig}
                    elementType={state.scontrols.externalJs.elementType}
                    value={state.scontrols.externalJs.value}
                    changed={(event) =>
                        inputChangeHandler(event, 'externalJs')
                    }
                />
            </div>
            <Button
                block={false}
                textColor="#fff"
                color="success"
                size="sm"
                clicked={submitHandler}
                disabled={state.formisSubmitted}>
                {state.formisSubmitted ? <Spinner /> : 'Save'}
            </Button>
        </form>
    )
    return <div>{form}</div>
}

export default JavascripTab
