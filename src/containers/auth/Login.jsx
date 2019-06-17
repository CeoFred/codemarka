import React, { Component } from "react";

import Input from "../../components/UI/Input.jsx";
import Form from "../../components/Wrappers/Form.jsx";
import Button from "../../components/UI/Button.jsx";

import "../../components/styles/login.css";

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
    }
  };

  /**
   * Button click controller
   */
  LoginAction = e => {
    
    // iziToast.show({
    //   title:'great'
    // })

    e.preventDefault();
    console.log("Button was clicked");
    this.setState({ isSubmited: true }, () => {
      console.log(this.state);
    });
  };

  /**
   * Input change handlers
   */
  inputChangedHandler = (e, inputType) => {
    e.preventDefault();
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
                  Go
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
                <a href="/auth/signup.html?utm_medium=l" className="txt2 hov1">
                  Sign Up
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
