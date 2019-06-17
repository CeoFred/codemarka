import {
    LOGIN_UPDATE, LOGIN_LOADING, 
    LOGIN_ERROR, LOGIN_ERRORS,
    REGISTER_UPDATE, REGISTER_LOADING, 
    REGISTER_ERROR, REGISTER_ERRORS, 
    LOGIN_USER_SUCCESS,
    
} from './Types'

import * as helper from '../../utility/shared'
// import axios from 'axios';

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
      
    }
};

export const registerUserOnCore = (data) => {
    
    return (dispatch) => {

        clearRegisterErrors(dispatch);

        dispatch({
            type: REGISTER_LOADING,
            payload: true
        });
        helper.fetch('http://localhost:8000/auth/signup','POST',data)
                .then(data => {console.log(data)
                
                    dispatch({
                        type: REGISTER_LOADING,
                        payload: false
                    });
    
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: data.data
                    });

                })
                .catch(err =>  {
                    dispatch({
                        type: REGISTER_LOADING,
                        payload: false
                    });
    
                    if(err.response.status === 422){
                        dispatch({
                            type: REGISTER_ERRORS,
                            payload: err.response.data.errors
                        });
                    }
    
                    if(err.response.status === 401){
                        dispatch({
                            type: REGISTER_ERROR,
                            payload: err.response.data.message
                        });
                    }
                    console.error(err)})    
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