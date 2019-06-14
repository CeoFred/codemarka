import {combineReducers } from 'redux'
import AuthReducer from './AuthReducer';
import LoadingReducer from './LoadingReducer';
import ErrorReducer from './ErrorReducer';
import GeneralReducer from './GeneralReducer';

export default  combineReducers({
    auth: AuthReducer,
    loader: LoadingReducer,
    error: ErrorReducer,
    general: GeneralReducer
})