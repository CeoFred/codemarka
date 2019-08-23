
import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

let INITIAL_STATE = {
    username:null,
    errorMessage:null,
    token:null,
    userId:null,
    loading:false,
    authRedirectPath:'/'
}

const authStart = (state,action) => {
    return helper.updateObject(state,{ errorMessage:null,
                                 loading: true,
                                 token:null,
                                 userId:null
                                });
}

const authFailed = (state,action) => {
    return helper.updateObject(state,{
        errorMessage:action.errorM,
        loading: false});
}

const authSuccess = (state,action) => {
    return helper.updateObject(state,{
        loading:false,
        errorMessage:null,
        userId:action.userId,
        token:action.idToken
    })
}

const authLogout = (state,action) => {

    return helper.updateObject(state,{
        token:null,
        userId:null
    });
} 

const setAuthRedirectPat = (state,action) => {
    return helper.updateObject(state,{
        authRedirectPath:action.path
    })
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case(actionTypes.AUTH_START): return authStart(state,action)
        case(actionTypes.AUTH_SUCCESS): return authSuccess(state,action);
        case(actionTypes.AUTH_FAILED): return authFailed(state,action);    
        case(actionTypes.AUTH_LOGOUT): return authLogout(state,action);   
        case(actionTypes.SET_AUTH_REDIRECT_PATH): return setAuthRedirectPat(state,action);     

        default: return state;
    }
}