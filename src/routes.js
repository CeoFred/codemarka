import React,{useEffect} from "react";
import { connect } from 'react-redux'
import {Switch,withRouter,Route, Redirect} from 'react-router-dom';

import * as actionType from './redux/actions/Types';
import * as url from './config/url';

const classrooom = React.lazy(() => import('./containers/classroom/Environment'));
const newclassroom = React.lazy(() => import('./containers/classroom/NewClassroom'));

const logout = React.lazy(() => import('./containers/auth/Logout'));
const Home = React.lazy(() => import('./containers/public/Home/Home'));

const Login = React.lazy(() => import('./containers/auth/Login'));
const Register = React.lazy(() => import('./containers/auth/Register'));
const ForgotPassword = React.lazy(() => import('./containers/auth/ForgotPassword'));
const ChangePassword = React.lazy(() => import('./containers/auth/ChangePassword'));

const NotFound = React.lazy(() => import('./containers/public/404'));

const Routes = (props) => {
  useEffect(() => {
    props.onTryAutoSignup()
  }, [props])
    let routes = (
        <Switch>  
<Route exact component={Home} path={url.HOME} />
<Route exact component={Login} path={url.AUTH_SIGN_IN} />
<Route exact component={Register} path={url.AUTH_SIGN_UP} />
<Route exact component={ForgotPassword} path={url.AUTH_FORGOT_PASSWORD} />
<Route exact component={newclassroom} path={url.CLASSROOM_NEW}/>
<Route exact component={classrooom} path={url.CLASSROOM} />
<Redirect from={url.CLASSROOMS} to={url.AUTH_SIGN_IN} />
<Route component={NotFound} />
<Redirect from={url.AUTH_LOGOUT} to={url.AUTH_SIGN_IN}/>

        </Switch>
      );
  
      if(props.isAutheticated){
        routes = (
  <Switch>
<Route exact component={Home} path={url.HOME} />
<Route exact component={ChangePassword} path={url.AUTH_CHANGE_PASSWORD} />
<Route exact component={logout} path={url.AUTH_LOGOUT} />
<Redirect from={url.AUTH_SIGN_IN} to={url.HOME}/>
<Redirect from={url.AUTH_SIGN_UP} to={url.HOME}/>
<Route component={NotFound} />

{/* <Route exact component={classrooom} path={url.CLASSROOM + ':classroomid'} /> */}
{/* <Route exact component={newclassrooom} path={url.CLASSROOM_NEW} /> */}
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
  onTryAutoSignup: () => dispatch({type: actionType.AUTO_AUTH_INIT})
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Routes));
  