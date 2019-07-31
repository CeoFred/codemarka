import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import * as actions from './redux/actions/index';
import Layout from './hoc/Layout/Layout.jsx'
import TopProgress from './components/UI/TopProgress'
import NewClassroom from './containers/classroom/NewClassroom'

const classrooom = React.lazy(() => import('./containers/classroom/Environment'));
const register = React.lazy(() => import('./containers/auth/Register'));
const login = React.lazy(() => import('./containers/auth/Login'));
const logout = React.lazy(() => import('./containers/auth/Logout'));

  
class Router extends Component {

    
  componentDidMount(){

    this.props.onTryAutoSignup();
    
  }
    render() {
        let routes = (
            <Switch>  
      <Redirect exact from="/classroom" to="/login"/>
      <Route path="/login" exact component={login}/>
      <Route path="/register" exact component={register}/>
      <Route path="/" exact component={TopProgress}/>

            </Switch>
          );
      
          if(this.props.isAutheticated){
            routes = (
      <Switch>
      <Route path="/classroom/new" exact component={NewClassroom}/>
      <Route path="/" exact component={classrooom}/>  
      <Route path="/classroom/preview/:id" exact component={TopProgress}/>    
      <Route path="/logout" exact component={logout}/>
      </Switch>
            )
          }

        return (<Layout>
                {routes}
              </Layout>
        )
    }
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
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Router));
  