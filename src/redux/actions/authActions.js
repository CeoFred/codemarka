import * as actionTypes from './Types'
import {  takeLatest  } from 'redux-saga/effects';

// import axios from 'axios';

export function* authRootSaga(){
    yield takeLatest(actionTypes.AUTH_START,auth)
}


export const authSuccess = (userId,token) => {

    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        errorM: error
    }
}


export const auth = (data) => {
    

        let url = 'http://localhost:2001/auth/user/signin';
        // let method = 'POST'
        var myHeaders = new Headers()
        myHeaders.append('Content-Type','Application/json')

let loginRequest = new Request(url,{
    method:'POST',
    cache:'default',
    headers:myHeaders,
    body:JSON.stringify(data.data),
    mode:'cors'

})
        fetch(loginRequest).then(res => {
            return res.json()
        
        }).then(res => {
            console.log(res)
            let expirationDate = new Date(new Date().getTime() + res.meta.expires * 1000);
            localStorage.setItem('token', res.meta.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId',res.meta.userId);
            setTimeout(() => {
                // dispatch(checkAuthTimeout(res.data.expiresIn));          
            }, 2000);
          
        }).catch(err =>  {
            setTimeout(() => {
            }, 2000);
             console.error(err)
        })
                    
};

export const register = (data) => {
    

        let url = 'http://localhost:8000/auth/user/signup';
        // let method = 'POST'
        var myHeaders = new Headers()
        myHeaders.append('Content-Type','Application/json')
let loginRequest = new Request(url,{
    method:'POST',
    cache:'default',
    headers:myHeaders,
    body:JSON.stringify(data),
    mode:'cors'

})
        fetch(loginRequest).then(res => {
            return res.json()
        
        }).then(res => {
            console.log(res)
            if(res.status === 'success'){
                let expirationDate = new Date(new Date().getTime() + res.meta.expires * 1000);
                localStorage.setItem('token', res.meta.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId',res.meta.userId);

            // setTimeout(() => {
            // dispatch(checkAuthTimeout(res.data.expiresIn));          
                // }, 2000);
              
            }
          
        }).catch(err =>  {
            setTimeout(() => {
            }, 2000);
             console.error(err)
        })            
};


// export const checkAuthTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         },expirationTime * 1000);
//     };
// };

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
        const token = localStorage.getItem('token');
        if(token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // console.log('ExpDte '+ expirationDate.getTime());
            // console.log('Date Nw ' + new Date().getTime());
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                // dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            }else{ 
            }
        } else {
           
        }
}

