import * as actionTypes from './Types'
import { put, takeLatest  } from 'redux-saga/effects';

// import axios from 'axios';

export function* authRootSaga(){
    yield takeLatest(actionTypes.AUTH_START,auth)
    yield takeLatest(actionTypes.AUTO_AUTH_INIT,authCheckState);
    yield takeLatest(actionTypes.AUTH_LOGOUT,logout)
}


export const authSuccess = (token) => {

    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        errorM: error
    }
}


function authUser(data){
    let url = 'http://localhost:2001/auth/user/signin';
    // let method = 'POST'
    var myHeaders = new Headers()
    myHeaders.append('Content-Type','Application/json')

let loginRequest = new Request(url,{
method:'POST',
cache:'default',
headers:myHeaders,
body:JSON.stringify(data.data),
mode:'cors'

})
    return fetch(loginRequest)
      .then(res =>res.json()).then(res =>  res)   
      .catch(err => err)
}

export function* auth (data){
    
     const res = yield authUser(data);
     if(!res.status){
         yield put(authFailed(res.message))
     }else {
   localStorage.setItem('r_ks', res.data.token);
   yield  put(authSuccess(res.data.token));
     }          
};

export const register = (data) => {
    

        let url = 'http://localhost:8000/auth/user/signup';
        // let method = 'POST'
        var myHeaders = new Headers()
        myHeaders.append('Content-Type','Application/json')
let loginRequest = new Request(url,{
    method:'POST',
    cache:'default',
    headers:myHeaders,
    body:JSON.stringify(data),
    mode:'cors'

})
        fetch(loginRequest).then(res => {
            return res.json()
        
        }).then(res => {
            console.log(res)
            if(res.status === 'success'){
                let expirationDate = new Date(new Date().getTime() + res.meta.expires * 1000);
                localStorage.setItem('token', res.meta.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId',res.meta.userId);

            // setTimeout(() => {
            // dispatch(checkAuthTimeout(res.data.expiresIn));          
                // }, 2000);
              
            }
          
        }).catch(err =>  {
            setTimeout(() => {
            }, 2000);
             console.error(err)
        })            
};


export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    };
};

export function* logout() {
    const token = localStorage.getItem('r_ks');
    if(token){
        localStorage.removeItem('r_ks');
        yield put({type: actionTypes.AUTH_LOGOUT})
    }   
}

export function* authCheckState() {
        const token = localStorage.getItem('r_ks');
        if(token){
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if(expirationDate > new Date()){
            //   yield put(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            // }else{ 

            // }
        yield put(authSuccess(token))
        } else {
        yield  put({type: actionTypes.AUTO_AUTH_FALED})
        }
   
}

