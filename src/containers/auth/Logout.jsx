import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter,Redirect} from 'react-router-dom';

import * as actions from '../../redux/actions/index'

 class Logout extends Component {

    componentDidMount(){
        this.props.dispatchLogout()
      }

    componentWillUnmount(){

    }

    render() {

        let content= 'Redirecting please wait ....'
        if(this.props.token === null){
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
      token: state.auth.token
    }
  }
  
  const matchDispatchToProps = (dispatch) => {
    return {
      dispatchLogout: () => dispatch(actions.logout())
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Logout));
  