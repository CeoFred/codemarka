import {
    LOGIN_UPDATE, LOGIN_LOADING, 
    LOGIN_ERROR, LOGIN_ERRORS,
    REGISTER_UPDATE, REGISTER_LOADING, 
    REGISTER_ERROR, REGISTER_ERRORS, 
    LOGIN_USER_SUCCESS,
    
} from './Types'

import axios from 'axios';

export const loginUpdate = (payload) => {

    return {
        type: LOGIN_UPDATE,
        payload
    }
};

export const registerUpdate = (payload) => {

    return {
        type: REGISTER_UPDATE,
        payload
    }
};


export const authenticateUserOnCore = (data) => {
    
    return (dispatch) => {

        clearLoginErrors(dispatch);
        dispatch({
            type: LOGIN_LOADING,
            payload: true
        });
        axios.post('auth/login', data)
            .then(res => {
                
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: res.data
                });

                console.log(res);
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_LOADING,
                    payload: false
                });
                if(err.response){
                    if(err.response.status == 422){
                        dispatch({
                            type: LOGIN_ERRORS,
                            payload: err.response.data.errors
                        });
                    }
    
                    if(err.response.status == 403){
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: 'Incorrect username or password'
                        });
                    }
                }
                
                
                
            })
      
    }
};

export const registerUserOnCore = (data) => {
    
    return (dispatch) => {

        clearRegisterErrors(dispatch);

        dispatch({
            type: REGISTER_LOADING,
            payload: true
        });
        axios.post('auth/signup', data)
            .then(res => {
                
                dispatch({
                    type: REGISTER_LOADING,
                    payload: false
                });

                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: res.data
                });

                console.log(res);
            })
            .catch(err => {
                dispatch({
                    type: REGISTER_LOADING,
                    payload: false
                });

                if(err.response.status == 422){
                    dispatch({
                        type: REGISTER_ERRORS,
                        payload: err.response.data.errors
                    });
                }

                if(err.response.status == 401){
                    dispatch({
                        type: REGISTER_ERROR,
                        payload: err.response.data.message
                    });
                }
                
                
            })
      
    }
};

const clearLoginErrors = (dispatch) => {
    dispatch({
        type: LOGIN_ERRORS,
        payload: {}
    });
    dispatch({
        type: LOGIN_ERROR,
        payload: ''
    })
}

const clearRegisterErrors = (dispatch) => {
    dispatch({
        type: REGISTER_ERRORS,
        payload: {}
    });
    dispatch({
        type: REGISTER_ERROR,
        payload: ''
    })
}