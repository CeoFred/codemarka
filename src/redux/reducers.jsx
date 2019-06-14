import {combineReducers } from 'redux'
import CoreServiceReducer from './reducers/index';

export default combineReducers({
    core: CoreServiceReducer
});