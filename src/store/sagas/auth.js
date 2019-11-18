import { put,delay,call } from 'redux-saga/effects';
import React from 'react';

import * as actions from '../actions/index';
import * as actionTypes from '../actions/Types';

export function* userLoginSaga(){
   yield put({
        type:'AUTH_USER_LOGIN'
    })
}

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationTime')
    yield localStorage.removeItem('userId')
    yield put({
        type: 'LOGOUT_SUCCESSFUL'
    })
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime)
    yield put()
}

export function* authRegisterUserSaga({email,password,username}){
    yield put({type: actionTypes.AUTH_USER_SIGNUP_START});

    let url = 'http://localhost:2001/auth/user/signup';
    let myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    let loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({email,password,username}),
        mode: 'cors'

    });
    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse =  yield call(resolvePromise,response.json())
        console.log(resolvedResponse)
        console.log(typeof resolvedResponse)


            if(resolvedResponse.status === 1){

            yield  put(actions.authRegisterSuccess(resolvedResponse.token))

            }else if(typeof resolvedResponse.message == 'object') {
                
               yield put(actions.authRegisterFailed(resolvedResponse.message[0].msg))
               
            } else {
                yield put(actions.authRegisterFailed(resolvedResponse.message))

            }
             
        
    } catch ({message}) {
        yield put(actions.authRegisterFailed(message));
    }

    
}

export function* saveUserData(params){
    const userTokenAlias = 'wx1298';
    const userIdAlias = 'u342345'
    if (localStorage.getItem(userTokenAlias) && localStorage.getItem(userIdAlias)) {
        yield localStorage.removeItem(userIdAlias);
        yield localStorage.removeItem(userTokenAlias);
        yield localStorage.setItem(userTokenAlias,params.response.message.token)
        yield localStorage.setItem(userIdAlias,params.response.message._id)

    } else {
        yield localStorage.setItem(userTokenAlias,params.response.message.token)
        yield localStorage.setItem(userIdAlias,params.response.message._id)        
    }
}

export function* authLoginUserSaga({email,password}){
    yield put({type: 'AUTH_USER_LOGIN_START'});

    let url = 'http://localhost:2001/auth/user/signin';
    let myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    let loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({email,password}),
        mode: 'cors'

    });
    
    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse =  yield call(resolvePromise,response.json())
        console.log(resolvedResponse)
        console.log(typeof resolvedResponse)


            if(resolvedResponse.status === 1){

            yield  put(actions.authLoginSuccess(resolvedResponse.message))

            }else if(typeof resolvedResponse.message == 'object') {
                let messages;
              messages =  resolvedResponse.message.map(data => {
                    return (<b>{data.msg}</b>)
                })
               yield put(actions.authLoginFailed(messages))
            } else {
                yield put(actions.authLoginFailed(resolvedResponse.message))

            }

             
        
    } catch ({message}) {
        yield put(actions.authLoginFailed(message));
    }

    
}

function resolvePromise(promise){
    return promise.then(data => data).catch(error => error);
}

// export function* authCheckState() {
//     const token = localStorage.getItem('r_ks');
//     if (token) {
//         yield put(actions.authSuccess(token))
//     } else {
//         yield put(actions.authFailed('No token'))
//     }
// }

