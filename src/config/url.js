//app pages

export const HOME = '/';
export const ABOUT = '/public/about-us';
export const CONTACT = '/public/contact-us';
export const TERMS_AND_CONDITIONS = '/public/terms-and-condition';
export const PRIVACY_POLICY = '/public/privacy-policy';
export const OAUTH_FAILED = '/auth/oauth/error';

//classroom
export const CLASSROOMS = '/classrooms/locale/all'
export const JOIN_CLASSROOM = '/classrooms/join/:classroom'
export const CLASSROOM = '/c/classroom/:classroom'
export const CLASSROOM_NEW = '/classroom/create'
export const PROTECTED_CLASSROOM_PREVIEW = '/c/classroom/setup/:classroomId'
export const CLASSROOM_PREVIEW_NEW_TAB = '/c/classroom/preview/:classroomId';

// Authentication
export const AUTH_SIGN_IN  = '/auth/signin';
export const AUTH_SIGN_UP  = '/auth/signup';
export const AUTH_FORGOT_PASSWORD = '/auth/account/recovery';
export const AUTH_CHANGE_PASSWORD = '/auth/user/account/password/reset/:token/:user';
export const AUTH_LOGOUT  = '/auth/user/logout';
export const OAUTH_URL = '/auth/user/oauth/success/:token/:user'
export const EMAIL_VERIFICATION = '/account/confirmed/:verified/'