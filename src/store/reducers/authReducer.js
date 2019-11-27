
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


const reset = (state, action ) => {
    return helper.updateObject(state,{
        error:false,
        message:'',
        loading: false
    })
}

const authLoginFailed = (state,{message}) => {
    // const msg = action.message
    return helper.updateObject(state,{
        error:true,
        loading: false,
        message
    });
}

const authLoginSuccess = (state,action) => {
    console.log(action)
    return helper.updateObject(state,{
        loading:false,
        error:false,
        message:'',
        authenticated:true,
        user:{
            token: action.response.token,
            userId:action.response._id,
            username: action.response.username
        }
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

const authRegistrationSuccess = (state,action) => {
    return helper.updateObject(state,{
            user: {
                ...state.user,
                token:action.token,
                email: action.email,
                username: action.username
            },
            authenticated:true,
            loading:false,
            message:'User registration Success',
            error:false        
    })
}

const authRegistrationFailed = (state, action) => {
    return helper.updateObject(state,{
        loading:false,
        error: true,
        message: action.error
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
            userId: action.id,
            username:action.username,
            email: action.email
        }
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
        case(actionTypes.AUTO_AUTH_SUCCESS): return authAutoSuccess(state,action);
        case(actionTypes.AUTH_USER_SIGNUP_FAILED): return authRegistrationFailed(state,action);
        case(actionTypes.AUTH_USER_SIGNUP_SUCCESS): return authRegistrationSuccess(state,action);
        case(actionTypes.AUTH_USER_SIGNUP_START): return authStart(state,action)
        case(actionTypes.NOTIFICATION_ALERT_CLOSE): return ClearAlertMessage(state,action)
        case(actionTypes.AUTH_RESET): return reset(state,action)
        default: return state;
    }
}
