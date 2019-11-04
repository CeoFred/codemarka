import { all } from 'redux-saga/effects'

import { watchAuth } from './watchers/auth';
import { watchApp } from './watchers/app';

function* rootSaga() {
    yield all([
        watchAuth(),
        watchApp()
      ])    
}

export default rootSaga;
