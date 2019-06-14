import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './containers/Dashboard';
import Master from './containers/partials/Master';
import Login from './containers/core/Auth/Login';
import Register from './containers/core/Auth/Register';
import ResetPassword from './containers/core/Auth/ResetPassword';
import Home from './containers/core/Auth/Home';


class Router extends Component{
    
    render(){
        return(
            
            <BrowserRouter>                                           
                <Switch>   
                    <Route exact path = '/' component={Home} />   
                    <Route exact path = '/login' component={Login} />      
                    <Route exact path = '/register' component={Register} /> 
                    <Route exact path = '/resetpassword' component={ResetPassword} /> 
                    <Master>                  
                        <Route exact path = '/dashboard' component={Dashboard} />
                    </Master>   
                </Switch>                                     
            </BrowserRouter>
            
            
        )
    }
}

const mapStateToProps = (state) =>{
    return{}
}
export default connect(mapStateToProps, {}) (Router)