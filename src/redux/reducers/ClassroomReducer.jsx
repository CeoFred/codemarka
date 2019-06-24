
import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

let INITIAL_STATE = {
    classroom_id:null,
    is_loaded:null,
    errors:null,
    loading:false,
    classdetails:null
}



const classroomCreationInit = (state,action) => {
    return helper.updateObject(state,{
        loading:true
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
        errors:action.payload
        });
} 


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case(actionTypes.CLASSROOM_CREATE_INIT): return classroomCreationInit(state,action)
        case(actionTypes.CLASS_CREATION_SUCCESS): return classroomCreatedSuccess(state,action)
        case(actionTypes.CLASS_CREATION_FAILED): return classroomCreationFailed(state,action)

        default: return state;
    }
}
