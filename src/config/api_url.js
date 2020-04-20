const host =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? process.env.REACT_APP_REMOTE_API_URL
        : process.env.REACT_APP_LOCAL_API_URL

export const CLASSROOM_VERIFY_URL = `${ host }classroom/verify/`;
export const CLASSROOM_CREATE = `${ host }classroom/create`;
export const CLASSROOM_FILE_DOWNLOAD = `${ host }classroom/download/`;

export const USER_SIGN_UP = `${ host }auth/user/signup`;
export const USER_SIGN_IN = `${ host }auth/user/signin`;
export const AUTO_LOGIN_USER = `${ host }auth/user/token/verify`;
export const ACCOUNT_RECOVERY =  `${ host }auth/user/account/recovery`;
export const ACCOUNT_PASSWORD_RESET = `${ host }auth/user/account/password/reset`
// Oauth

export const GITHUB_AUTH_URL = `${ host }auth/github`;
export const GOOGLE_AUTH_URL = `${ host }auth/google`;

//community creation
export const COMMUNITY_ACCOUNT_CREATE_INFO_TEMP = `${host}community/auth/create/info/temp`;
export const COMMUNITY_ACCOUNT_CREATE_CONTACT_INFO_TEMP = `${host}community/auth/create/contactInfo/temp`
export const COMMUNITY_ACCOUNT_CREATE_LOGO_TEMP = `${host}community/auth/create/logo/temp`
export const COMMUNITY_ACCOUNT_CREATE_SOCIAL_MEDIA_INFO_TEMP = `${host}community/auth/create/socialInfo/temp`
export const COMMUNITY_ACCOUNT_CREATE_ORGANIZERS_TEMP = `${host}community/auth/create/organizers/temp`
export const COMMUNITY_ACCOUNT_CREATE_FINAL = `${host}community/auth/create/final`;
