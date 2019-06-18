import React, { Component } from "react";
import { connect } from 'react-redux'
import {Link,withRouter} from 'react-router-dom';

import Input from "../../components/UI/Input.jsx";
import Form from "../../components/Wrappers/Form.jsx";
import Button from "../../components/UI/Button.jsx";
import "../../components/styles/login.css";
import * as actions from '../../redux/actions/index'
import Progress from '../../components/UI/progress';

class Home extends Component {
  state = {
    isSubmited: false,
    email: {
      value: "",
      touched: false
    },
    password: {
      value: "",
      touched: false
    },
    accountTye:{
        value:'',
        touched:false
    },
    confirm_password:{
      value:'',
      touched:false,
      valid:false
    },
    username:{
      value:'',
      touched:false,
      valid:false
    },
    
  };

  /**
   * Button click controller
   */
  registerAction = e => {
    e.preventDefault();

    const  data = {
      email:this.state.email.value,
      password:this.state.password.value,
      username:this.state.username.value,
      accountType:1
    }
    this.props.registerUser(data)

    this.setState({ isSubmited: true }, () => {
      console.log(this.state);
    });


  };

  /**
   * Input change handlers
   */
  inputChangedHandler = (e, inputType) => {
    let oldState = { ...this.state };
    let stateProp = oldState[inputType];
    stateProp.value = e.target.value;

    stateProp.touched = true;

    let newState = oldState;
    this.setState({newState});
  }
  render() {
    
    let buttonContent = '';

    if(this.props.authStarted){
      buttonContent =  <Progress/>
    }else{
      buttonContent = 'Create'
    }
    return (
      <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
        <div className="container-login100 loginBg">

          <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
            <Form title="Sign up for free today and explore classrooms..">
            <Input
                inputChanged={e => this.inputChangedHandler(e, "username")}
                value={this.state.username.value}
                type="text"
                name="username"
                placeholder="username"
                required
              />

              <Input
                inputChanged={e => this.inputChangedHandler(e, "email")}
                value={this.state.email.value}
                type="email"
                name="email"
                placeholder="email"
                required
              />
              <Input
                inputChanged={e => this.inputChangedHandler(e, "password")}
                value={this.state.password.value}
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <Input
                inputChanged={e => this.inputChangedHandler(e, "confirm_password")}
                value={this.state.confirm_password.value}
                type="password"
                name="confirm_password"
                placeholder="confirm password"
                required
              />
              

              <div className="container-login100-form-btn">
                <Button type="submit" submit={this.registerAction}>
                  {buttonContent}
                </Button>
              </div>

              <div className="text-center p-t-57 p-b-20">
                <span className="txt1">Or continue with</span>
              </div>

              <div className="flex-c p-b-112">
                <a href="http://facebook.com" className="login100-social-item">
                  <i className="fa fa-facebook-f" />
                </a>

                <a
                  href="http://google.com/auth"
                  className="login100-social-item"
                >
                  <img src="images/icons/icon-google.png" alt="GOOGLE" />
                </a>
              </div>

              <div className="text-center">
                  <Link to="/login">Already have an account?</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => dispatch(actions.register(data))
  };
};

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Home));
