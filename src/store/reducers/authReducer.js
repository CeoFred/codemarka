import * as actionTypes from '../actions/Types'
import * as helper from '../../utility/shared'

const INITIAL_STATE = {
    
    error:false,
    loading:false,
    message:'',
    user:{
        username:null,
        token:null,
        userId:null,
        photoUrl:null,
        email:null
    },
    authenticated:false,
    authState:null
}

const authStart = (state,action) => {
    return helper.updateObject(state,{ 
        error:false,
        message:'',
        loading: true,
        authState:'started'
      });
}

const reset = (state, action ) => {
    return helper.updateObject(state,{
        error:false,
        message:'',
        loading: false,
        authState:null
    })
}

const authLoginFailed = (state,{ message }) => {
    // const msg = action.message
    return helper.updateObject(state,{
        error:true,
        loading: false,
        message,
        authState:'done'
    });
}

const authLoginSuccess = (state,action) => {
    return helper.updateObject(state,{
        loading:false,
        error:false,
        message:'',
        authenticated:true,
        user:{
            token: action.response.token,
            userId:action.response._id,
            username: action.response.username || action.response.profile.name
        },
        authState:'done'
    })
}

const authLogout = (state,action) => {

    return helper.updateObject(state,{
        authenticated:false,
        user: {
            token: null,
            userId: null,
            username: null,
            email: null
        }
    });
} 
const autoAuthFailed = (state) => {
    return helper.updateObject(state,{
        authenticated:false,
        user: {
            token: null,
            userId: null,
            username: null,
            email: null
        },
        authState: 'done'
    })
}
const setAuthRedirectPat = (state,action) => {
    return helper.updateObject(state,{
        authRedirectPath:action.path
    })
}

const authRegistrationSuccess = (state,action) => {
    return helper.updateObject(state,{
            loading:false,
            message:action.message,
            error:false,
            authState:'done',
            Registrationsuccess:true        
    })
}

const authRegistrationFailed = (state, action) => {
    return helper.updateObject(state,{
        loading:false,
        error: true,
        message: action.error,
            authState:'done'        

    })
}

const ClearAlertMessage = (state,action) => {
    return helper.updateObject(state,{
        message:null,
        error: false
    })
}

const authAutoSuccess = ( state, action ) => {
    return helper.updateObject(state,{
        authenticated: true,
        error: false,
        loading: false,
        message: '',
        user: { 
            token: action.token,
            userId: action._id,
            username:action.username,
            email: action.email
        },
        authState:'done'        

    })
}

const logoutSuccessful = (state, action) => {
    return helper.updateObject(state,{
        authenticated: false,
        user : {
            token: null,
            userId: null,
            username: null,
            email: null
        },
        error: false,
        loading: false,
        message: ''
    })
}

const autoAuthInit = (state, action) => {
    return helper.updateObject(state,{
        authState:'started'
    });
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case(actionTypes.AUTH_USER_LOGIN_START): return authStart(state,action)
        case(actionTypes.AUTH_USER_LOGIN_SUCCESS): return authLoginSuccess(state,action);
        case(actionTypes.AUTH_USER_LOGIN_FAILED): return authLoginFailed(state,action);    
        case(actionTypes.AUTH_LOGOUT): return authLogout(state,action);   
        case(actionTypes.SET_AUTH_REDIRECT_PATH): return setAuthRedirectPat(state,action);     
        case(actionTypes.AUTO_AUTH_FAILED): return autoAuthFailed(state,action);
        case(actionTypes.AUTO_AUTH_SUCCESS): return authAutoSuccess(state,action);
        case(actionTypes.AUTH_USER_SIGNUP_FAILED): return authRegistrationFailed(state,action);
        case(actionTypes.AUTO_AUTH_INIT) : return autoAuthInit(state,action);
        case(actionTypes.AUTH_USER_SIGNUP_SUCCESS): return authRegistrationSuccess(state,action);
        case(actionTypes.AUTH_USER_SIGNUP_START): return authStart(state,action)
        case(actionTypes.NOTIFICATION_ALERT_CLOSE): return ClearAlertMessage(state,action)
        case(actionTypes.AUTH_RESET): return reset(state,action)
        case(actionTypes.LOGOUT_SUCCESSFUL): return logoutSuccessful(state,action);
        default: return state;
    }
}
