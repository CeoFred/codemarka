/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/** @format */

import React, { useState, useLayoutEffect,useEffect } from 'react'
import { connect } from 'react-redux';
import Input from '../../../Partials/Input/Input'

import * as classroomActions from '../../../../store/actions/classRoom';

 function AudioVideoSettings(props) {

    const handleClassroomInformationInputChange = (e, inputname) => {
        const deviceGroupidSelected =  e.target.value;
        console.log(deviceGroupidSelected)

            const newDefaultInput = props.audioVideoSettings[inputname].filter(
                (inputDevice) => inputDevice.deviceId === deviceGroupidSelected
            )[0]
            console.log(newDefaultInput)
            const data = {
                ...props.default,
                [inputname]: newDefaultInput,
            }
            props.setDefaultInputs(data);

    }
  
    return (
        <div className="m-4 mt-0 mb-3 text-white-50">
            <form>
                <Input
                    name="audiooutput"
                    label="Select Audio Output"
                    elementType="select"
                    value={ prop.default.audiooutput.deviceId }
                    elementConfig={ {
                        disabled: false,
                        name: 'audiooutput',
                        options: props.audioVideoSettings.audiooutput.map(
                            (device) => {
                                return {
                                    displayValue: device.label,
                                    value: device.deviceId,
                                    selected: device.deviceId === 'default',
                                    key: `${ Math.random() * 4 * 300 }${
                                        device.deviceId
                                    }`,
                                }
                            }
                        ),
                    } }
                    shouldDisplay={ true }
                    changed={ (e) =>
                        handleClassroomInformationInputChange(e, 'audiooutput')
                    }
                />
                <Input
                    name="audioinput"
                    label="Select Audio Input"
                    elementType="select"
                    value={ prop.default.audioinput.deviceId }
                    elementConfig={ {
                        disabled: false,
                        name: 'audioinput',
                        options: props.audioVideoSettings.audioinput.map(
                            (device) => {
                                return {
                                    displayValue: device.label,
                                    value: device.deviceId,
                                    selected: device.deviceId === 'default',
                                    key: Math.random() * 4 * 300,
                                }
                            }
                        ),
                    } }
                    shouldDisplay={ true }
                    changed={ (e) =>
                        handleClassroomInformationInputChange(e, 'audioinput')
                    }
                />
                <Input
                    name="videoinput"
                    label="Select Video Input"
                    elementType="select"
                    value={ props.default.videoinput.deviceId }
                    elementConfig={ {
                        disabled: false,
                        name: 'videoinput',
                        options: props.audioVideoSettings.videoinput.map(
                            (device, array) => {
                                return {
                                    displayValue: device.label,
                                    value: device.deviceId,
                                    selected:
                                        device.deviceId === 'default' ||
                                        array.length === 1,
                                    key: Math.random() * 4 * 300,
                                }
                            }
                        ),
                    } }
                    shouldDisplay={ true }
                    changed={ (e) =>
                        handleClassroomInformationInputChange(e, 'videoinput')
                    }
                />
            </form>
        </div>
    )
}

const mapStateToProps = ({classroom}) => {
    return {
        audioVideoSettings: classroom.audioVideoDeviceAndConfigs,
        default: classroom.defaultAudioVideoConfig,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDefaultInputs: (data) => dispatch(classroomActions.setDefaultInputOutputDevices(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioVideoSettings)
