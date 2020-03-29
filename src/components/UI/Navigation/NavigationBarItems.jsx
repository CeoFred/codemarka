import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as url from '../../../config/url';
function NavigationBarItems(props) {
    if (props.isAuthenticated) {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.HOME}>
                        Home
                  </a>
                </li>

                <li className="nav-item">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.BLOG}>
                        Blog
                  </a>
                </li>

                <li className="nav-item ">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.CLASSROOM_NEW}>
                        Create
                  </a>
                </li>

                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}>
                        Welcome Back, {props.username} {' !'}
                    </span>
                </li>

                <li className="nav-item" style={{ fontWeight: 'normal' }}>
                    <Link to={url.AUTH_LOGOUT} className="nav-link">
                        logout
                  </Link>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.HOME}>
                        Home
              </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.BLOG}>
                        Blog
              </a>
                </li>
                <li className="nav-item ">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.ABOUT}>
                        About
              </a>
                </li>
                <li className="nav-item ">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href="/#pricing">
                        Pricing
              </a>
                </li>

                <li className="nav-item ">
                    <a
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        href={url.AUTH_SIGN_IN}>
                        Login
              </a>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        username: auth.user.username,
        isAuthenticated: auth.authenticated
    }
}

export default connect(mapStateToProps, null)(NavigationBarItems)