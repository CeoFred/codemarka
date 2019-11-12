import { put,delay,call } from 'redux-saga/effects';

import * as actions from '../actions/index';

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

            if(resolvedResponse.status === 1){
            yield  put(actions.authLoginSuccess(resolvedResponse.token))

            }else {
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

export function* register(data) {


    let url = 'http://localhost:8000/auth/user/signup';
    // let method = 'POST'
    var myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')
    let loginRequest = new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify(data),
        mode: 'cors'

    })
   const response = yield fetch(loginRequest)
   const jsonResponse = yield response.json()
   yield put({type:'AUTH_USER_REGISTRATION_SUCCESS',jsonResponse})

};
