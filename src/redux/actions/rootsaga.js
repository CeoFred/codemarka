import { all } from 'redux-saga/effects'

import {watchAsyncCookieAccepted,
    watchAsyncCookieValidationInit
    } from './appActions';

    import {classroomWatchers} from './classRoomActions';

    import { authRootSaga } from './authActions';
function* rootSaga() {
    yield all([
        classroomWatchers(),
        watchAsyncCookieValidationInit(),
        watchAsyncCookieAccepted(),
        authRootSaga()
      ])    
}

export default rootSaga;
