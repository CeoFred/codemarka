import { put ,takeLatest,call  } from 'redux-saga/effects';

import * as actionTypes from './Types'
import * as apiURL from '../../config/api_url';


let header = new Headers()

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// use them in parallel
export function* classroomWatchers() {
    yield takeLatest(actionTypes.CLASSROOM_ASYNC_VERIFICATION_INIT, checkClassroom)
    yield takeLatest(actionTypes.CLASSROOM_CREATE_INIT, createClassroomAsync)
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

 export function* createClassroomAsync({data}){
    let fetchResult = yield call(createNewClass,[data]);
    console.log(fetchResult); // logs Promise object
    yield put(classCreationSuccess(fetchResult)) // I want payload to be 1
  }

 function createNewClass(data){
        let url = 'http://localhost:2001/classroom/create'

        if(!header.get('Authorization')){
            header.set('Authorization',`Bearer ${data[0].token}`)
        }
        header.set('Content-Type', 'Application/json')


        let loginRequest = new Request(url, {
            method: 'POST',
            cache: 'default',
            headers: header,
            body: JSON.stringify(data[0]),
            mode: 'cors'

        })
     return fetch(loginRequest).then(res => {

            return res.json()

        }).then(res => {
            return res;
        }).catch(err => {
            return err;
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


