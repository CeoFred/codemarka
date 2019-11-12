import * as actionTypes from './Types'

export const authLoginSuccess = (token) => {

    return {
        type: actionTypes.AUTH_USER_LOGIN_SUCCESS,
        idToken: token,
    }
};

export const authLoginFailed = (error) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_FAILED,
        message:error 
    }
}

/**
 *  Action Dispatcher for authenticating users
 * @returns object
 * @param required paremeters  
 */
export const authLoginUser = (paremeters) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_INIT,
        ...paremeters
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: 'AUTH_CHECK_TIMEOUT',
        expirationTime
    };
};

export const logout = () => {
    return {
        type:'AUTH_LOGOUT_INIT'
    }
}

export const logoutSucceed = () => {
    return {
        type: 'LOGOUT_SUCCESSFUL'
    }
}



