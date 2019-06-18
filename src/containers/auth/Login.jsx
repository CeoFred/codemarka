import React, { Component } from "react";
import { connect } from 'react-redux'
import {Link,withRouter,Redirect} from 'react-router-dom';

import Input from "../../components/UI/Input.jsx";
import Form from "../../components/Wrappers/Form.jsx";
import Button from "../../components/UI/Button.jsx";
import "../../components/styles/login.css";
import Snackbar from '@material-ui/core/Snackbar';
import Progress from '../../components/UI/progress';
import * as actions from '../../redux/actions/index'

class Login extends Component {
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
    open:false,vertical:'bottom',horizontal:'left'

  };

  componentDidMount = () => {
    document.title  = 'Login :: colab.inc'
  }
  /**
   * Button click controller
   */
  LoginAction = e => {
    e.preventDefault();

    if(this.props.isAutheticated){
      return <Redirect to="/"/>
    }

    const  data = {
      email:this.state.email.value,
      password:this.state.password.value
    }
    this.props.loginUser(data)

    this.setState({ isSubmited: true }, () => {
      console.log(this.state);
    });
    this.handleSnackBar()
  

  };


  handleSnackBar =  () => {

    this.setState({open:true,vertical:'bottom',horizontal:'left'})
  
  }

  handleClose = () => {
    this.setState({...this.state,open:false})
  }
  /**
   * Input change handlers
   */
  inputChangedHandler = (e, inputType) => {
    let oldState = { ...this.state };
    let stateProp = oldState[inputType];
    stateProp.value = e.target.value;

    stateProp.touched = true;

    let newState = oldState;
    this.setState(newState, () => {
      console.table(this.state);
    });
  };

  render() {

    let buttonContent = '';

    if(this.props.authStarted){
      buttonContent =  <Progress/>
    }else{
      buttonContent = 'Go'
    }
    return (
      <div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
        <div className="container-login100 loginBg">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
            <Form title="Explore Classrooms..">
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

              <div className="container-login100-form-btn">
                <Button type="submit" submit={this.LoginAction}>
                  {buttonContent}
                </Button>
              </div>

              <div className="text-center p-t-57 p-b-20">
                <span className="txt1">Or login with</span>
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
                  <Link to="/auth/signup">New Account</Link>
              </div>
            </Form>
            <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null,
    authStarted: state.auth.loading === true
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
loginUser: data => dispatch(actions.auth(data))
  };
};

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Login));
