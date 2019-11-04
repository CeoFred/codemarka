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
        message: error
    }
}


export const authLoginUser = (email) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN_INIT,
        ...email
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



