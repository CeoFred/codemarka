/** @format */

import React,{useState} from 'react'
import Input from '../../../Partials/Input/Input'

export default function Details(props) {
    let socket,toast,owner;
    const [ClassroomInformation, setClassroomInformation] = useState({
        cname: {
            value: props.cdata.name,
        },
        cdesc: {
            value: props.cdata.description,
        },
        ctopic: {
            value: props.cdata.topic,
        },
        submitted: false,
    })
    const handleClassroomInformationInputChange = (e, inputname) => {
        const v = e.target.value

        setClassroomInformation((input) => {
            return { ...input, [inputname]: { value: v } }
        })
    }
    const handleClassInfoUpdate = (e) => {
        e.preventDefault()

        setClassroomInformation((input) => {
            return { ...input, submitted: true }
        })
        if (owner) {
            socket.emit('classInformationUpdate', ClassroomInformation)
        } else {
            toast.error('No Access to perfom this action')
        }
    }
    return (
        <div className="ml-7 mr-7 mt-0">
            <div>
    Short URL - <b>{props.cdata.shortUrl}</b> { ' '}
            
            </div>
            <form onSubmit={handleClassInfoUpdate}>
                <Input
                    name="cname"
                    label="Classroom Name"
                    elementType="input"
                    elementConfig={{
                        disabled: props.owner ? false : true,
                        placeholder: 'Classroom Name',
                        name: 'cname',
                    }}
                    value={ClassroomInformation.cname.value}
                    changed={(e) =>
                        handleClassroomInformationInputChange(e, 'cname')
                    }
                />
                <Input
                    name="ctopic"
                    label="Classroom Topic"
                    elementType="input"
                    elementConfig={{
                        disabled: props.owner ? false : true,
                        placeholder: 'Classroom Name',
                        name: 'ctopic',
                    }}
                    value={ClassroomInformation.ctopic.value}
                    changed={(e) =>
                        handleClassroomInformationInputChange(e, 'ctopic')
                    }
                />
                <Input
                    label="Classroom Description"
                    elementType="textarea"
                    elementConfig={{
                        disabled: props.owner ? false : true,
                        placeholder: 'Classroom Name',
                        name: 'cdesc',
                    }}
                    value={ClassroomInformation.cdesc.value}
                    changed={(e) =>
                        handleClassroomInformationInputChange(e, 'cdesc')
                    }
                />
            </form>
        </div>
    )
}
