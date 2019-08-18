import * as actionTypes from './Types'

export const dispatchCookieAccepted = (token) => {
    return {
        type: actionTypes.ACCEPT_COOKIE,
        token
    }
};

export const cookieAccepted = () => {
    return dispatch => {
        const cookie_token = localStorage.getItem('ctok');
        if (cookie_token) {
            localStorage.setItem('ctok', cookie_token)

            dispatch(dispatchCookieAlreadyAccepted(cookie_token));

        } else {
            const cookie_token = (Math.random() * 22345678912345678934)
            localStorage.setItem('ctok', cookie_token)
            dispatch(dispatchCookieAccepted(cookie_token));

        }
    }
}

export const dispatchCookieAlreadyAccepted = (oldToken) => {
    return {
        type: actionTypes.COOKIE_ALREADY_ACCEPTED,
        token: oldToken
    }
}

export const tryValidatingCookie = () => {
    return dispatch => {
        const cookie_token = localStorage.getItem('ctok');
        if (cookie_token) {
            localStorage.setItem('ctok', cookie_token)

            dispatch(dispatchCookieAlreadyAccepted(cookie_token));

        }
    }
}