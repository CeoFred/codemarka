/** @format */

import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../../media/images/logo/codemark__logo.png'
export default function FooterBar() {
    const { app } = useSelector(state => state)
    let display

    if (app.environment === 'classroom') {
        display = false
    } else {
        display = true
    }

    return (
        <div>
            <footer
                id="footer-main"
                style={ { display: display ? 'block' : 'none' } }>
                <div className="footer footer-dark">
                    <div className="container">
                        <div className="row pt-md">
                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <div
                                    className="card bg-dark border-none"
                                    style={ { border: 'none' } }>
                                    <div className="card-body p-0">
                                        <img src={ logo } style={ { width:'100%'} } className="img-responsive" alt="codemarka" />
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-4 col-sm-4 mb-5 mb-lg-0">
                                <h6 className="heading mb-3">About</h6>
                                <ul className="list-unstyled text-small">
                                    <li>
                                        <Link to="/public/about-us">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/public/contact-us">
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="https://sandbox.codemarka.dev"
                                            target="_blank">
                                            Sandbox
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="/#">Careers</a>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-lg-2 col-4 col-sm-4 mb-5 mb-lg-0">
                                <h6 className="heading mb-3">Company</h6>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="/terms-and-conditions">
                                            Terms
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/privacy-and-policy">
                                            Privacy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/public/contact-us">Support</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-4 col-sm-4 mb-5 mb-lg-0">
                                <h6 className="heading mb-3">Socials</h6>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            rel="noopener noreferrer"
                                            href="https://twitter.com/codemarka"
                                            target="_blank"
                                            nofollow="true">
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            rel="noopener noreferrer"
                                            href="https://fb.me/codemarka.dev"
                                            target="_blank">
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            rel="noopener noreferrer"
                                            href="https://www.linkedin.com/company/codemarka"
                                            target="_blank">
                                            Linkedin
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-md-between py-4 mt-4 border-top mx-0">
                            <div className="col-12 mb-3 mb-md-0">
                                <div className="copyright text-sm font-weight-bold text-center">
                                    © 2020{' '}
                                    <span className="font-weight-bold">
                                        Codemarka ,
                                    </span>
                                    Inc.
                                </div>
                            </div>
                            {/* <div className="col-md-6">
                                <ul className="nav align-items-center justify-content-center justify-content-md-end">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/public/about-us">
                                            Support
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/#">
                                            Terms
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pr-0" href="/#">
                                            Privacy
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
