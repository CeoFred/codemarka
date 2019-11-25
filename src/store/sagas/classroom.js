import { put,call } from 'redux-saga/effects';

import * as actionTypes from '../actions/Types';
import * as actions from '../actions/index'
import { CLASSROOM_CREATE,CLASSROOM_VERIFY_URL } from '../../config/api_url'
import { resolvePromise } from '../../utility/shared';
const host = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL

const delay = (ms) => new Promise(res => setTimeout(res, ms))
let myHeaders =  new Headers(); 


export function* createClass({data}){
    yield put({type: actionTypes.CLASSROOM_CREATE_START});

    let url = `${host}${CLASSROOM_CREATE}`;
    myHeaders.set('Content-Type', 'Application/json')
    myHeaders.set('Authorization',`Bearer ${data.token}`)
    let loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify(data),
        mode: 'cors'
    });

    
    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse =  yield call(resolvePromise,response.json())
        console.log(resolvedResponse)
    } catch (e) {
        console.log(e)
    }
    console.log(data)

}

export function* verifyClassRoom({classId}){
    yield delay(100)
     
    yield put({ type: actionTypes.CLASSROOM_VERIFICATION_INIT })


    const requestData = {classroom: classId }

     const url = `${host}${CLASSROOM_VERIFY_URL}`;
     myHeaders.set('Content-Type', 'Application/json')

    const request = new Request(url, {
     method: 'POST',
     cache: 'default',
     headers: myHeaders,
     body: JSON.stringify(requestData),
     mode: 'cors'

 })
 try {
    const response = yield fetch(request)
    const resolvedResponse =  yield call(resolvePromise,response.json())
    console.log(resolvedResponse)
    yield put(actions.classVerifySuccess(resolvedResponse.message._id))
} catch (e) {
    yield put(actions.classVerifyFailed(classId))
    console.log(e)
}
}
