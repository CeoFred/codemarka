import { takeLatest } from 'redux-saga/effects'

import { logoutSaga,checkAuthTimeoutSaga ,authLoginUserSaga} from '../auth';
import * as actionTypes from '../../actions/Types';

export function* watchAuth(){
    yield takeLatest('AUTH_LOGOUT_INIT',logoutSaga)
    yield takeLatest('AUTH_CHECK_TIMEOUT',checkAuthTimeoutSaga)
    yield takeLatest(actionTypes.AUTH_USER_LOGIN_INIT,authLoginUserSaga)
}