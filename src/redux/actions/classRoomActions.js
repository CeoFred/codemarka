import { put ,takeLatest  } from 'redux-saga/effects';


import * as actionTypes from './Types'
import * as apiURL from '../../config/api_url';


let header = new Headers()

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// use them in parallel
export function* classroomWatchers() {
    yield takeLatest(actionTypes.CLASSROOM_ASYNC_VERIFICATION_INIT, checkClassroom)
    yield takeLatest(actionTypes.CLASSROOM_CREATE_INIT, createNewClass)
}


export function* checkClassroom(action){
       yield delay(100)
        
       yield put({ type: actionTypes.CLASSROOM_VERIFICATION_INIT })

       const classroom_id = action.classroom
       const user = action.user;

       const requestData = {
           classroom: classroom_id,
           user
       }
        const url = apiURL.CLASSROOM_VERIFY_URL;
        header.append('Content-Type', 'Application/json')

       const request = new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: header,
        body: JSON.stringify(requestData),
        mode: 'cors'

    })
      yield fetch(request).then(res => {

        return res

    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)

    })

}





export const createClassRoomInit = () => {
    return {
        type: actionTypes.CLASSROOM_CREATE_INIT
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



export function* createNewClass({data}){
    yield console.log(data)
    // return (dispatch) => {
    //     dispatch(createClassRoomInit)
        let url = 'http://localhost:2001/classroom/create'

        if (!(header.get('Authorization')) & header.get('Content-Type') !== 'Application/json') {
            header.append('Authorization', `Bearer ${data.token}`)
            header.append('Content-Type', 'Application/json')

        }


        let loginRequest = new Request(url, {
            method: 'POST',
            cache: 'default',
            headers: header,
            body: JSON.stringify(data),
            mode: 'cors'

        })
       yield fetch(loginRequest).then(res => {

            return res.json()

        }).then(res => {
            console.log(res)
            if (res.status === 'created') {
                put(classCreationSuccess(res.data))
            } else if (res.error && res.type === 'mongo') {
                put(classCreationFailed(res.error.errors))
            }
        }).catch(err => {
            console.error(err)
            put(classCreationFailed(err))

        })

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


