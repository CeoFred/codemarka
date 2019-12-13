import { put, delay, call } from 'redux-saga/effects';

import * as actions from '../actions/index';
import * as actionTypes from '../actions/Types';
import { resolvePromise } from '../../utility/shared';


const host = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL
const userTokenAlias = 'wx1298';
const userIdAlias = 'u342345';

export function* userLoginSaga() {
    yield put({
        type: 'AUTH_USER_LOGIN'
    })
}

export function* logoutSaga() {
    yield localStorage.removeItem(userTokenAlias);
    yield localStorage.removeItem(userIdAlias);
    yield put({
        type: 'LOGOUT_SUCCESSFUL'
    })
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime)
    yield put()
}

export function* authRegisterUserSaga({ email, password, username }) {
    yield put({ type: actionTypes.AUTH_USER_SIGNUP_START });

    let url = `${host}auth/user/signup`;
    let myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    let loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ email, password, username }),
        mode: 'cors'

    });

    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse = yield call(resolvePromise, response.json())

        if (resolvedResponse.status === 1) {

            if (localStorage.getItem(userTokenAlias) && localStorage.getItem(userIdAlias)) {
                yield localStorage.removeItem(userIdAlias);
                yield localStorage.removeItem(userTokenAlias);
                yield localStorage.setItem(userTokenAlias, resolvedResponse.data.token)
                yield localStorage.setItem(userIdAlias, resolvedResponse.data._id)

            } else {
                yield localStorage.setItem(userTokenAlias, resolvedResponse.data.token)
                yield localStorage.setItem(userIdAlias, resolvedResponse.data._id)
            }

            yield put(actions.authRegisterSuccess(resolvedResponse.data));


        } else if (typeof resolvedResponse.message == 'object') {

            yield put(actions.authRegisterFailed(resolvedResponse.message[0].msg))

        } else {
            yield put(actions.authRegisterFailed(resolvedResponse.message))

        }


    } catch ({ message }) {
        if(message && message === 'Failed to fetch'){
            yield put(actions.authRegisterFailed('Whoops! Newtwork error!'))
        } else {
        yield put(actions.authRegisterFailed('Opps! Something went wrong'));

            }
    }


}


export function* authLoginUserSaga({ email, password }) {
    yield put({ type: 'AUTH_USER_LOGIN_START' });

    let url = `${host}auth/user/signin`;
    let myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    let loginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ email, password }),
        mode: 'cors'

    });

    try {
        const response = yield fetch(loginRequest)
        const resolvedResponse = yield call(resolvePromise, response.json())



        if (resolvedResponse.status === 1) {

            if (localStorage.getItem(userTokenAlias) && localStorage.getItem(userIdAlias)) {
                yield localStorage.removeItem(userIdAlias);
                yield localStorage.removeItem(userTokenAlias);
                yield localStorage.setItem(userTokenAlias, resolvedResponse.data.token)
                yield localStorage.setItem(userIdAlias, resolvedResponse.data._id)

            } else {
                yield localStorage.setItem(userTokenAlias, resolvedResponse.data.token)
                yield localStorage.setItem(userIdAlias, resolvedResponse.data._id)
            }

            yield put(actions.authRegisterSuccess(resolvedResponse.data));


        } else if (typeof resolvedResponse.message == 'object') {

            yield put(actions.authRegisterFailed(resolvedResponse.message[0].msg))

        } else {
            yield put(actions.authRegisterFailed(resolvedResponse.message))

        }

    } catch ({ message }) {
        if(message && message === 'Failed to fetch'){
            yield put(actions.authLoginFailed('Whoops! Newtwork error!'))
        } else {
        yield put(actions.authLoginFailed('Opps! Something went wrong'));

            }
    }


}


export function* autoLoginUserSaga() {
    const _id = localStorage.getItem(userIdAlias);
    const _token = localStorage.getItem(userTokenAlias)

    let url = `${host}auth/user/token/verify`;
    let myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    let autoLoginRequest = yield new Request(url, {
        method: 'POST',
        cache: 'default',
        headers: myHeaders,
        body: JSON.stringify({ token: _token, user: _id }),
        mode: 'cors'

    });

    const token_v = yield localStorage.getItem(userTokenAlias);
    const userid_v = yield localStorage.getItem(userIdAlias);

    if (token_v && userid_v) {


        try {

            const response = yield fetch(autoLoginRequest)
            const resolvedResponse = yield call(resolvePromise, response.json())
            if (resolvedResponse.status === 1) {

                if (token_v && userid_v) {

                    yield localStorage.setItem(userTokenAlias, token_v)
                    yield localStorage.setItem(userIdAlias, userid_v)

                }
                resolvedResponse.data.token = token_v;
                yield put(actions.autoAuthSuccess(resolvedResponse.data));


            } else if (resolvedResponse.message.name === 'JsonWebTokenError') {

                yield put(actions.autoAuthFailed('jwt malformed'))

            } else {

                if (resolvedResponse.message) {
                    yield localStorage.clear();
                }

                yield put(actions.autoAuthFailed(resolvedResponse.message))

            }

        } catch ({ message }) {
            yield put(actions.autoAuthFailed({ message }))

        }
    } else {
        yield put(actions.autoAuthFailed('Token and userid not found'))

    }

}

