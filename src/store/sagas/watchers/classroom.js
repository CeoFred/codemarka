import { takeLatest } from 'redux-saga/effects'

import { createClass } from '../classroom';
import * as actionTypes from '../../actions/Types';

export function* watchClassroom(){

yield takeLatest(actionTypes.CLASSROOM_CREATE_INIT,createClass)
}