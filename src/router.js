import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import * as actions from './redux/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout.jsx'
import TopProgress from './components/UI/TopProgress'
import NewClassroom from './containers/classroom/NewClassroom'
import Logout from './containers/auth/Logout.jsx';

const asyncRegister = asyncComponent(() => {
  return import('./containers/auth/Register.jsx');
});

const asyncFullWidth = asyncComponent(() => {
  return import('./hoc/Layout/Grid');
});


const asyncLogin = asyncComponent(() => {
    return import('./containers/auth/Login.jsx');
  });
  
  const asyncClassroom = asyncComponent(() => {
    return import('./containers/classroom/ENV2.jsx');
  })
class Router extends Component {

    
  componentDidMount(){

    this.props.onTryAutoSignup();
    
  }
    render() {
        let routes = (
            <Switch>  
      <Redirect exact from="/classroom" to="/login"/>
      <Route path="/login" exact component={asyncLogin}/>
      <Route path="/logout" exact component={Logout}/>
      <Route path="/register" exact component={asyncRegister}/>
      <Route path="/" exact component={TopProgress}/>

            </Switch>
          );
      
          if(this.props.isAutheticated){
            routes = (
      <Switch>
      <Route path="/" exact component={asyncFullWidth}/>
      <Route path="/classroom/new" exact component={NewClassroom}/>
      <Route path="/classroom/:id" exact component={asyncClassroom}/>      
      <Route path="/logout" exact component={Logout}/>
      <Route path="/login" exact component={asyncLogin}/>
      <Route path="/register" exact component={asyncRegister}/>

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
  