import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter,Redirect} from 'react-router-dom';

import * as actions from '../../redux/actions/index'

 class Logout extends Component {

    componentDidMount(){
        this.props.dispatchLogout()
        console.log(this.props)
    }

    render() {

        let content= 'Redirecting please wait ....'
        if(this.props.isLoggedOut){
            content = <Redirect to="/login"/>
        }

        return (
            <div>
                {content}
            </div>
        )
    
}
}

const mapStateToProps = state => {
    return {
      isLoggedOut: state.auth.token === null
    }
  }
  
  const matchDispatchToProps = (dispatch) => {
    return {
      dispatchLogout: () => dispatch(actions.logout())
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Logout));
  