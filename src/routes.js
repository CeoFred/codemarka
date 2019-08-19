import React from "react";
import { connect } from 'react-redux'
import {Switch,withRouter,Route} from 'react-router-dom';
import * as actions from './redux/actions/index';

// const classrooom = React.lazy(() => import('./containers/classroom/Environment'));
// const register = React.lazy(() => import('./containers/auth/Register'));
// const login = React.lazy(() => import('./containers/auth/Login'));
// const logout = React.lazy(() => import('./containers/auth/Logout'));

 const Home = React.lazy(() => import('./containers/public/Home/Home'))
const Routes = (props) => {
    let routes = (
        <Switch>  
<Route exact component={Home} path='/' />
        </Switch>
      );
  
      if(props.isAutheticated){
        routes = (
  <Switch>
<Route exact component={Home} path='/' />
  </Switch>
        )
      }
    return (
<React.Fragment>
    {routes}
</React.Fragment>
    );
}
const mapStateToProps = state => {
    return {
      isAutheticated: state.auth.token !== null
    }
  }
  
  const matchDispatchToProps = (dispatch) => {
    return {
  onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Routes));
  