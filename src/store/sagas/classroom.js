import { put,call } from 'redux-saga/effects';

import * as actionTypes from '../actions/Types';
import { CLASSROOM_CREATE } from '../../config/api_url'
import { resolvePromise } from '../../utility/shared';

export function* createClass({data}){
    yield put({type: actionTypes.CLASSROOM_CREATE_START});

    let url = `http://localhost:2001/${CLASSROOM_CREATE}`;
    let myHeaders = yield new Headers()
    myHeaders.append('Content-Type', 'Application/json')

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