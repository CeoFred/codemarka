import React from 'react'
import {connect} from "react-redux"


import Home from './Home';
import AuthHome from './Auth_Home';

function Index(props) {
    if(props.isAuthenticated){
        return (
            <AuthHome />
        )
    }
    return <Home />
}


const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.user.token !== null,
    }
  }
  
  
  export default connect( mapStateToProps, null )(Index)