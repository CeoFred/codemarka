import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import * as url from '../../../config/url';
function NavigationBarItems(props) {
    if(props.isAuthenticated){
      return(
          <div className="collapse navbar-collapse" id="navbar-primary">
              <ul className="navbar-nav ml-lg-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to={ url.HOME }>
            Home
                      </Link>
                  </li>

                  <li className="nav-item ">
                      <Link className="nav-link" to={ url.CLASSROOM_NEW }>
            Create
                      </Link>
                  </li>

                  <li className="nav-item">
                      <span className="nav-link">Welcome, {props.username}</span>
                  </li>

                  <li className="nav-item">
                      <Link to={ url.AUTH_LOGOUT } className="nav-link">
        logout</Link>
                  </li>

              </ul>
          </div>
      )
    } else {
  return (
      <div className="collapse navbar-collapse" id="navbar-primary">
          <ul className="navbar-nav ml-lg-auto">
              <li className="nav-item">
                  <Link className="nav-link" to={ url.HOME }>
            Home
                  </Link>
              </li>
              <li className="nav-item ">
                  <a className="nav-link" href='/#features'>
            Features
                  </a>
              </li>
              <li className="nav-item ">
                  <a className="nav-link" href='/#pricing'>
            Pricing
                  </a>
              </li>

              <li className="nav-item ">
                  <Link className="nav-link" to={ url.AUTH_SIGN_IN }>
            Login
                  </Link>
              </li>

          </ul>
      </div>
  );
    }
}

const mapStateToProps = ({ auth }) => {
  return {
    username: auth.user.username,
    isAuthenticated: auth.authenticated
  }
}

export default connect( mapStateToProps, null )(NavigationBarItems)