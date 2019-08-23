import React from "react";

import logo from '../../../media/images/logo.png'
export default function FooterBar() {
  return (
    <div>
      <footer id="footer-main">
        <div className="footer footer-dark">
          <div className="container">
            <div className="row pt-md">
              <div className="col-lg-4 mb-5 mb-lg-0">
                  <img
                      alt="placeholder"
                      src={logo}
                      className="img-fluid"
                      style={{width:150}}
                    />
                   
              </div>
              <div className="col-lg-2 col-6 col-sm-4 offset-lg-1 mb-5 mb-lg-0">
                <h6 className="heading mb-3">Account</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="/#">Profile</a>
                  </li>
                  <li>
                    <a href="/#">Settings</a>
                  </li>
                  <li>
                    <a href="/#">Billing</a>
                  </li>
                  <li>
                    <a href="/#">Notifications</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-6 col-sm-4 mb-5 mb-lg-0">
                <h6 className="heading mb-3">About</h6>
                <ul className="list-unstyled text-small">
                  <li>
                    <a href="/#">Services</a>
                  </li>
                  <li>
                    <a href="/#">Contact</a>
                  </li>
                  <li>
                    <a href="/#">Careers</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-sm-4 mb-5 mb-lg-0">
                <h6 className="heading mb-3">Company</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="/#">Terms</a>
                  </li>
                  <li>
                    <a href="/#">Privacy</a>
                  </li>
                  <li>
                    <a href="/#">Support</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row align-items-center justify-content-md-between py-4 mt-4 border-top mx-0">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="copyright text-sm font-weight-bold text-center text-md-left">
                  © {new Date().getFullYear()} {' '}
                  <a
                    href="https://webpixels.io/"
                    className="font-weight-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    colab inc
                  </a>
                  . All rights reserved.
                </div>
              </div>
              <div className="col-md-6">
                <ul className="nav align-items-center justify-content-center justify-content-md-end">
                  <li className="nav-item dropdown border-right pr-2">
                    <a
                      className="nav-link btn btn-xs btn-neutral"
                      href="/#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        alt="placeholder"
                        src=""
                        className="svg-inject icon-flag"
                      />{" "}
                      <span className="h6 text-sm mb-0">Romanian</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                      <a href="/#" className="dropdown-item">
                        <img
                          alt="placeholder"
                          src=""
                          className="svg-inject icon-flag"
                        />
                        Spanish
                      </a>{" "}
                      <a href="/" className="dropdown-item">
                        <img
                          alt="placeholder"
                          src=""
                          className="svg-inject icon-flag"
                        />
                        English
                      </a>
                      <a href="/#" className="dropdown-item">
                        <img
                          alt="placeholder"
                          src=""
                          className="svg-inject icon-flag"
                        />
                        Greek
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="//#">
                      Support
                    </a>
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
