import React from 'react'
import { connect } from 'react-redux'

import Home from './Home';
import AuthHome from './Auth_Home';
import Helment from '../../../components/SEO/helmet'
function Index(props) {
    if(props.isAuthenticated){
        return (
            <div>
                <Helment title='Codemarka.dev - colaboration and learning in real time'/>
                <AuthHome />
            </div>
        )
    }
    return (
        <div>
            <Helment title="Codemarka.dev - colaboration and learning in real time" />

            <Home />
        </div>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.user.token !== null,
    }
  }
  
  export default connect( mapStateToProps, null )(Index)