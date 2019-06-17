import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Login from './containers/auth/Login';
import Environment from './containers/classroom/Environment.jsx'
import * as actions from './redux/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout.jsx'

const asyncLogin = asyncComponent(() => {
    return import('./containers/auth/Login');
  });
  
  const asyncClassroom = asyncComponent(() => {
    return import('./containers/classroom/Environment.jsx');
  })

class Router extends Component {

    
  componentDidMount(){

    // this.props.onTryAutoSignup();
     
  }
    render() {
        let routes = (
            <Switch>      
      <Route path="/classroom" exact component={asyncClassroom}/>
      <Route path="/login" exact component={asyncLogin}/>
      <Redirect to="/"/>
            </Switch>
          );
      
          if(this.props.isAutheticated){
            routes = (
      <Switch>

    <Route path="/classroom" exact component={Environment}/>
      <Route path="/login" exact component={Login}/>
      <Redirect from="/" to="/login"/> 
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
  onTryAutoSignup: () => dispatch(actions.loginUpdate())
    };
  };
  
  export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Router));
  