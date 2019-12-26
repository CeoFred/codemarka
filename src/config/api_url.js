const host =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? process.env.REACT_APP_REMOTE_API_URL
        : process.env.REACT_APP_LOCAL_API_URL

export const CLASSROOM_VERIFY_URL = `${ host }classroom/verify/`;
export const CLASSROOM_CREATE = `${ host }classroom/create`;
export const CLASSROOM_FILE_DOWNLOAD = `${ host }classroom/download/`;

export const USER_SIGN_UP = `${ host }auth/user/signup`;
export const USER_SIGN_IN = `${ host }auth/user/signin`;
export const AUTO_LOGIN_USER = `${ host }auth/user/token/verify`
// Oauth

export const GITHUB_AUTH_URL = `${ host }auth/github`;
export const GOOGLE_AUTH_URL = `${ host }auth/google`;