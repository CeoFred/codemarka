import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as url from '../../config/url';

function Logout(props) {
    
    const { isAuthenticated, onLogout } = props;

    useEffect(() => {
        if(isAuthenticated){
             
            const logout = () => {
                const host = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL

                const url = `${ host }auth/user/logout`;
                const userTokenAlias = 'wx1298'

                const myHeaders = new Headers()
                myHeaders.append('Content-Type', 'Application/json')
                myHeaders.append(
                    'Authorization',
                    `Bearer ${ localStorage.getItem(userTokenAlias) }`
                )
                const logoutRequest =  new Request(url, {
                    method: 'GET',
                    cache: 'default',
                    headers: myHeaders,
                    mode: 'cors'
                });
            
               return fetch(logoutRequest)
            }

            logout().then(data => data.json()).then(res => {
                if(Number(res.status) === 1){
                    onLogout()
                }
                onLogout()
            })
            
        } 
    }, [ onLogout,isAuthenticated ]);

    const checkAuth = () => {
        if(!isAuthenticated){
            return (<Redirect to={ url.AUTH_SIGN_IN }/>);
        }
    }
    props.onLogout()
    return (
        <div>
            {checkAuth()}
            Redirecting...
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

const mapStateToPorps = ({ auth }) => {
    return {
        isAuthenticated: auth.authenticated
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(Logout);