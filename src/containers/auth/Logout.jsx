import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as url from "../../config/url";

function Logout(props) {
    
    const {isAuthenticated, onLogout} = props;

    useEffect(() => {
        if(isAuthenticated){
            onLogout();
        } 
    }, [onLogout,isAuthenticated]);

    const checkAuth = () => {
        if(!isAuthenticated){
            return (<Redirect to={url.AUTH_SIGN_IN}/>);
        }
    }
    return (
        <div>
            {checkAuth()}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

const mapStateToPorps = ({auth}) => {
    return {
        isAuthenticated: auth.authenticated
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(Logout);