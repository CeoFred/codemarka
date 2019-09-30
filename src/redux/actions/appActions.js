import * as actionTypes from './Types'
import { put,takeLatest  } from 'redux-saga/effects';


 const dispatchCookieAccepted = (token) => {
    return {
        type: actionTypes.ACCEPT_COOKIE,
        token
    }
};

 const dispatchCookieAlreadyAccepted = (oldToken) => {
    return {
        type: actionTypes.COOKIE_ALREADY_ACCEPTED,
        token: oldToken
    }
}

export const dispatchAppEnvironment = (environ) => {
    return {
        type: actionTypes.ENVIRONMENT_SWITCH,
        currentEnv:environ
    }
}



export function* cookieAccepted() {
    
        const cookie_token = localStorage.getItem('ctok');
        if (cookie_token) {
            localStorage.setItem('ctok', cookie_token)

          yield  put(dispatchCookieAlreadyAccepted(cookie_token));

        } else {
            const cookie_token = (Math.random() * 22345678912345678934)
            localStorage.setItem('ctok', cookie_token)
           yield put(dispatchCookieAccepted(cookie_token));

        }

}


export function* tryValidatingCookie() {
        const cookie_token = localStorage.getItem('ctok');
      

        if (cookie_token) {
            localStorage.setItem('ctok', cookie_token)
            yield put(dispatchCookieAlreadyAccepted(cookie_token))
        }else {
            yield console.log('NO COOKIE SET');
        }
    
}

export function* watchAsyncCookieValidationInit(){
    yield takeLatest(actionTypes.COOKIE_VALIDATE_INIT,tryValidatingCookie)
}

export function* watchAsyncCookieAccepted(){
    yield takeLatest(actionTypes.ACCEPT_COOKIE,cookieAccepted)
}


