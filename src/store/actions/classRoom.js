import * as actionTypes from './Types'


export function classVerify(classId){
    return {
        type:actionTypes.CLASSROOM_ASYNC_VERIFICATION_INIT,
        classId
    }
}

export function classVerifySuccess(classroom){
    return {
        type: actionTypes.CLASSROOM_VERIFICATION_SUCCESS,
        classroom
    }
}

export function classResetAll(){
    return {
        type: 'CLASSROO_RESET'
    }
}

export function classVerifyFailed(classroom){
    return {
        type: actionTypes.CLASSROOM_VERIFICATION_FAILED
    }
}
export const createClassRoomInit = (data) => {
    return {
        type: actionTypes.CLASSROOM_CREATE_INIT,
        ...data
    }
}

export const userJoinedAClass = (classroom) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLASSROOM_JOINED,
            classroom
        })
    }
}

export const userLeftAClass = (classroom) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLASSROOM_LEFT,
            classroom
        })
    }
}


export const classCreationFailed = (error) => {
    return {
        type: actionTypes.CLASS_CREATION_FAILED,
        errors: error

    }
}

export const classCreationSuccess = (details) => {
    return {
        type: actionTypes.CLASS_CREATION_SUCCESS,
        payload: details
    }
}


