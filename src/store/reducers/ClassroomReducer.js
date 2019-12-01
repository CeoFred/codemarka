
import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

let INITIAL_STATE = {
    classroom_id:null,
    is_loaded:null,
    errors:null,
    loading:false,
    classdetails:null,
    validated:false
}



const classroomCreationInit = (state,action) => {
    return helper.updateObject(state,{
        loading:true,
        errors:null,
        classdetails:null,
        classroom_id:null
        });
} 

const classroomCreatedSuccess = (state,action) => {
    return helper.updateObject(state,{
        loading:false,
       classdetails:action.payload
        });
} 

const classroomCreationFailed = (state,action) => {
    return helper.updateObject(state,{
            errors:action.errors
        });
} 

const classroomJoined = (state,action) => {
    return helper.updateObject(state,{
        classroom_id:action.classroom
    })
}

const classroomLeft = (state,action) => {
    if(state.classroom_id === action.classroom){
        return helper.updateObject(state,{
            classroom_id:null
        })
    }
  return errorLeavingClass(state,state.classroom_id,action.classroom)
}

const errorLeavingClass = (state,prevClass,newClass) => {
    return helper.updateObject(state,{
        errors:"Failed to leave classroom",
        classdetails: `${prevClass} is not same with ${newClass}`
    })
}

const classroomVerifyStart = (state,action) => {
    return helper.updateObject(state,{
        classroom_id:null,
        errors:null
    })
}


const classroomVerified = (state,action) => {
    return helper.updateObject(state,{
        validated: true,
        ...action.classroom
    })
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case(actionTypes.CLASSROOM_CREATE_INIT): return classroomCreationInit(state,action)
        case(actionTypes.CLASS_CREATION_SUCCESS): return classroomCreatedSuccess(state,action)
        case(actionTypes.CLASS_CREATION_FAILED): return classroomCreationFailed(state,action)
        case(actionTypes.CLASSROOM_JOINED): return classroomJoined(state,action)
        case(actionTypes.CLASSROOM_LEFT): return classroomLeft(state,action)
        case(actionTypes.CLASSROOM_VERIFICATION_INIT): return classroomVerifyStart(state,action) 
        case(actionTypes.CLASSROOM_VERIFICATION_SUCCESS): return classroomVerified(state,action)
        default: return state;
    }
}
