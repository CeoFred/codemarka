import { all } from 'redux-saga/effects'

import {watchAsyncCookieAccepted,watchAsyncCookieValidationInit} from './appActions';
import {classroomWatchers} from './classRoomActions';

function* rootSaga() {
    yield all([
        classroomWatchers(),
        watchAsyncCookieValidationInit(),
        watchAsyncCookieAccepted(),
      ])    
}

export default rootSaga;
