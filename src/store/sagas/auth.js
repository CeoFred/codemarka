import { put,delay,call } from 'redux-saga/effects';

import * as actions from '../actions/index';
import * as actionTypes from '../actions/Types';
import { resolvePromise } from '../../utility/shared';


const host = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL
const userTokenAlias = 'wx1298';
        const userIdAlias = 'u342345'
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

    let url = `${host}auth/user/signup`;
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

            if(resolvedResponse.status === 1){

    if (localStorage.getItem(userTokenAlias) && localStorage.getItem(userIdAlias)) {
        yield localStorage.removeItem(userIdAlias);
        yield localStorage.removeItem(userTokenAlias);
        yield localStorage.setItem(userTokenAlias,resolvedResponse.data.token)
        yield localStorage.setItem(userIdAlias,resolvedResponse.data._id)

    } else {
        yield localStorage.setItem(userTokenAlias,resolvedResponse.data.token)
        yield localStorage.setItem(userIdAlias,resolvedResponse.data._id)        
    }
            
            yield put(actions.authRegisterSuccess(resolvedResponse.data));


            }else if(typeof resolvedResponse.message == 'object') {
                
               yield put(actions.authRegisterFailed(resolvedResponse.message[0].msg))
               
            } else {
                yield put(actions.authRegisterFailed(resolvedResponse.message))

            }
             
        
    } catch ({message}) {
        yield put(actions.authRegisterFailed(message));
    }

    
}


export function* authLoginUserSaga({email,password}){
    yield put({type: 'AUTH_USER_LOGIN_START'});

    let url = `${host}auth/user/signin`;
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
                
    if (localStorage.getItem(userTokenAlias) && localStorage.getItem(userIdAlias)) {
        yield localStorage.removeItem(userIdAlias);
        yield localStorage.removeItem(userTokenAlias);
        yield localStorage.setItem(userTokenAlias,resolvedResponse.data.token)
        yield localStorage.setItem(userIdAlias,resolvedResponse.data._id)

    } else {
        yield localStorage.setItem(userTokenAlias,resolvedResponse.data.token)
        yield localStorage.setItem(userIdAlias,resolvedResponse.data._id)        
    }
            
            yield put(actions.authRegisterSuccess(resolvedResponse.data));


            }else if(typeof resolvedResponse.message == 'object') {
                
               yield put(actions.authRegisterFailed(resolvedResponse.message[0].msg))
               
            } else {
                yield put(actions.authRegisterFailed(resolvedResponse.message))

        }
            
    } catch ({message}) {
        yield put(actions.authLoginFailed(message));
    }

    
}


export function* autoLoginUserSaga() {
    const _id = localStorage.getItem(userIdAlias);
    const _token = localStorage.getItem(userTokenAlias)
    if (_id && _token) {
        yield put(actions.autoAuthSuccess(_id,_token))
    } else {
        yield put(actions.autoAuthFailed('No token'))
    }
}

