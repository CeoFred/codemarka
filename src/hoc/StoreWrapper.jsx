import React, { Component } from 'react';

import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom';
import * as actions from '../redux/actions/'

class Wrapper extends Component {
  render() {
    return (
      <div> 
        {this.props.children}      
     </div>
    );
  }
}
const mapStateToProps = state => {
    return {
      isAutheticated: state.auth.token !== null,
      userId:state.auth.userId,
      token:state.auth.token,
      username:state.auth.userame
    }
  }
  
  const matchDispatchToProps = (dispatch) => {
    return {
  onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Wrapper));
  