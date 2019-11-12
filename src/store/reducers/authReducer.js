
import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

let INITIAL_STATE = {
    
    error:false,
    loading:false,
    message:'',
    user:{
        username:null,
        token:null,
        userId:null,
        photoUrl:null
    },
    authenticated:false
}

const authStart = (state,action) => {
    return helper.updateObject(state,{ 
        error:false,
        message:'',
        loading: true
      });
}

const authLoginFailed = (state,action) => {
    // const msg = action.message
    return helper.updateObject(state,{
        error:true,
        loading: false,
        message:action
    });
}

const authLoginSuccess = (state,action) => {
    return helper.updateObject(state,{
        loading:false,
        error:false,
        message:'',
        authenticated:true,
    })
}

const authLogout = (state,action) => {

    return helper.updateObject(state,{
        authenticated:false,
    });
} 

const setAuthRedirectPat = (state,action) => {
    return helper.updateObject(state,{
        authRedirectPath:action.path
    })
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case(actionTypes.AUTH_USER_LOGIN_START): return authStart(state,action)
        case(actionTypes.AUTH_USER_LOGIN_SUCCESS): return authLoginSuccess(state,action);
        case(actionTypes.AUTH_USER_LOGIN_FAILED): return authLoginFailed(state,action);    
        case(actionTypes.AUTH_LOGOUT): return authLogout(state,action);   
        case(actionTypes.SET_AUTH_REDIRECT_PATH): return setAuthRedirectPat(state,action);     
        case(actionTypes.AUTO_AUTH_FALED): return authLogout(state,action);
      
        default: return state;
    }
}
