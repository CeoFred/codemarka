/* eslint-disable react/prop-types */
/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import isFuture from 'date-fns/isFuture'

import Spinner from '../../components/Partials/Preloader'
import { checkValidity } from '../../utility/shared'

import Button from '../../components/Partials/Button'
import Input from '../../components/Partials/Input/Input'
import Helmet from '../../components/SEO/helmet'
import { dispatchAppEnvironment } from '../../store/actions/app'

import countyJson from '../../utility/country.json';

import Alert from '../../components/Partials/Alert/Alert'

import './newclassroom.css'
import * as action from '../../store/actions'

function NewClassroom(props) {
    useEffect(() => {
        props.onClassroomSwitch('classroom')
    });
    
    const mappedCountry = countyJson.map((country) => {
        return {value:`${ country.code }`, displayValue: `${ country.name }`}
    });
    const [state, setState] = useState({
        controls: {
            name: {
                label: 'Classroom Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Dragon Riders'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            topic: {
                label: 'Topic',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Javascript ES6'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            startDate: {
                label: 'Start Date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Select Date'
                },
                value: '',
                validation: {
                    required: true,
                    isFutureDate: true
                },
                valid: false,
                touched: false
            },
            startTime: {
                label: 'Start Time',
                elementType: 'input',
                elementConfig: {
                    type: 'time',
                    placeholder: 'Select Time'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            visibility: {
                label: 'Visibility',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: '',
                            displayValue: 'Select Visibility'
                        },
                        {
                            value: 'Public',
                            displayValue: 'Public'
                        },
                        {
                            value: 'Private',
                            displayValue: 'Private'
                        }
                    ]
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            location: {
                label: 'location',
                elementType: 'select',
                elementConfig: {
                    options: mappedCountry
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            classType: {
                label: 'classtype',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: '',
                            displayValue: 'Select class Type'
                        },
                        {
                            value: 'Basic Web App',
                            displayValue: 'Basic Web App(HTML,CSS AND JS)'
                        }
                    ]
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            description: {
                label: 'class description',
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea'
                    // placeholder: "Sele"
                },
                value: '',
                validation: {
                    required: true
                    // minLength: 3
                },
                valid: false,
                touched: false
            }
        },
        formisValid: false,
        formisSubmitted: props.loading ? true : false,
        formErrorMessage: false,
        formErrored: false,
        alertType: null
    })

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...state.controls,
            [controlName]: {
                ...state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    state.controls[controlName].validation
                ),
                touched: true
            }
        }

        let formisValid = true
        for (const inputIdentifier in updatedControls) {
            formisValid = updatedControls[inputIdentifier].valid && formisValid
        }

        setState({ ...state, controls: updatedControls, formisValid })
        // console.log(updatedControls);
    }

    const submitHandler = event => {
        event.preventDefault()
        const formisSubmitted = true
        setState({ ...state, formisSubmitted })

        const formData = {}

        if (state.formisValid) {
            for (const formElementIdentifier in state.controls) {
                formData[formElementIdentifier] =
                    state.controls[formElementIdentifier].value
            }
            formData.token = props.token;
            const date = formData.startDate;
            const time = formData.startTime;

            if(!isFuture(new Date(`${ date } ${ time }`))){
                alert('Please Ensure your start date and time is in the future');
                 setState({ ...state, formisSubmitted:false,
                     controls: {
                         ...state.controls,
                         startDate:{...state.controls.startTime,valid: false}} });
                return false;
            }
            // eslint-disable-next-line no-undef
            props.onCreate(formData)
        } else {
            setState({
                ...state,
                alertType: 'error',
                formErrored: true,
                formErrorMessage:
                    'Form Validation Failed, please check inputs and try again'
            })
            return false
        }
    }

    const formElementArray = []
    for (const key in state.controls) {
        formElementArray.push({
            id: key,
            config: state.controls[key]
        })
    }
    const form = (
        <form onSubmit={ submitHandler }>
            {formElementArray.map(formElement => (
                <Input
                    key={ formElement.id }
                    elementConfig={ formElement.config.elementConfig }
                    elementType={ formElement.config.elementType }
                    value={ formElement.config.value }
                    changed={ event => inputChangeHandler(event, formElement.id) }
                    invalid={ formElement.config.valid }
                    touched={ formElement.config.touched }
                    label={ formElement.config.label }
                />
            ))}

            <Button
                block
                textColor="#fff"
                color="success"
                clicked={ submitHandler }
                disabled={ !state.formisValid }>
                {state.formisSubmitted ? <Spinner /> : 'Go'}
            </Button>
        </form>
    )

    if (props.classroom) {
        return <Redirect to={ `/c/classroom/${ props.classroom }` } />
    }

    return (
        <div>
            <button
                className="zindex-100 btn btn-outline-info fixed-left position-md-absolute position-absolute
                         rounded-circle btn-icon-only mt-3 float-left ml-3">
                <a href="/">
                    {' '}
                    <span class="btn-inner--icon">
                        <i className="fa fa-home"></i>
                    </span>
                </a>
            </button>
            <Helmet
                title="Create a classroom | codemarka"
                metaDescription="Collaborte, build and learn in real time when you create a classroom for free."></Helmet>

            <section>
                <div className="row min-vh-100">
                    <div className="col-sm-0 col-md-6 col-lg-6 col-xl-6 px-sm-5 px-lg-5 p-md-2 py-md-0 px-md-5 mb-3 registration-container">
                        <div>
                            <div className="mb-5 mt-2 text-center">
                                <b className="text-muted mb-0"></b>
                            </div>
                            <span className="clearfix" />
                            <Alert
                                type={ state.alertType }
                                display={ state.formErrorMessage }
                                title="Heads Up!">
                                {state.formErrorMessage}
                            </Alert>
                            <div className="py-4 text-center">
                                <h6 className="h3 mb-0">
                                    Create your Free Classroom Today!
                                </h6>
                            </div>
                            <span className="clearfix" />
                            {form}
                        </div>
                    </div>
                    {/* image section */}

                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-6 py-md-0 side">
                        <div className="align-content-center justify-content-center "></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = ({ auth, classroom }) => {
    return {
        token: auth.user.token,
        classroom: classroom.classdetails ? classroom.classdetails.Kid : null,
        loading: classroom.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: data => dispatch(action.createClassRoomInit(data)),

        onResetAll: () => dispatch(action.classResetAll()),

        onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewClassroom)
