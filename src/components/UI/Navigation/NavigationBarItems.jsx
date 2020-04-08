import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as url from '../../../config/url';
function NavigationBarItems(props) {
    const [showBlog, setShowBlog] = React.useState(false);
    if (props.isAuthenticated) {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to={url.HOME}>
                        Home
                  </Link>
                </li>

                {
                    showBlog ?
                        (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    style={{ fontWeight: 'normal' }}
                                    to={url.BLOG}
                                >Blog</Link>
                            </li>
                        ) : null
                }

                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to={url.CLASSROOM_NEW}>
                        Create
                  </Link>
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
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to={url.HOME}>
                        Home
              </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to={url.BLOG}>
                        Blog
              </Link>
                </li>
                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to={url.ABOUT}>
                        About
              </Link>
                </li>
                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to="/#pricing">
                        Pricing
              </Link>
                </li>

                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={{ fontWeight: 'normal' }}
                        to={url.AUTH_SIGN_IN}>
                        Login
              </Link>
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