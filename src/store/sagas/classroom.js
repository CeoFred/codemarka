/* eslint-disable no-undef */
import { put,call } from 'redux-saga/effects';
import * as APIURLS from '../../config/api_url'

import * as actionTypes from '../actions/Types';
import * as actions from '../actions/index'
import { resolvePromise } from '../../utility/shared';

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const myHeaders =  new Headers(); 

export function* createClass(data){
    yield put({ type: actionTypes.CLASSROOM_CREATE_START });

    const url = APIURLS.CLASSROOM_CREATE;
    myHeaders.set('Content-Type', 'Application/json')
    myHeaders.set('Authorization',`Bearer ${ data.token }`)
    const loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify(data),
        mode: 'cors'
    });
    
    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse =  yield call(resolvePromise,response.json())        

        if(resolvedResponse.status === 1){
                    
                    yield put(actions.classCreationSuccess(resolvedResponse.data));
        
                    }else if(typeof resolvedResponse.message == 'object') {
                        
                       yield put(actions.classCreationFailed(resolvedResponse.message[ 0 ].msg))
                       
                    } else {
                        yield put(actions.classCreationFailed(resolvedResponse.message))
        
                    }

    } catch ({ message }) {
        yield put(actions.authRegisterFailed(message));

    }

}

export function* verifyClassRoom({ classKid }){
    yield delay(100)
     
    yield put({ type: actionTypes.CLASSROOM_VERIFICATION_INIT })

    const requestData = { classroom: classKid }

     const url = APIURLS.CLASSROOM_VERIFY_URL;
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
    const resolvedResponse =  yield call(resolvePromise,response.json());
    if(resolvedResponse.status !== 1){
        yield put(actions.classVerifyFailed(resolvedResponse.message));
    } else {
        if(resolvedResponse.data){
            yield put(actions.classVerifySuccess(resolvedResponse.data));
        } else {
        yield put(actions.classVerifySuccess(resolvedResponse.message));
        }
    }
} catch (e) {
    yield put(actions.classVerifyFailed('Failed to verify classroom status'));
    console.log(e)
}
}
