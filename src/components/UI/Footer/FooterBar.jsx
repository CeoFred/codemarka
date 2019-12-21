import React from 'react';
import { useSelector } from 'react-redux';

import logo from '../../../media/images/logo.png'

export default function FooterBar() {

  const { app } = useSelector(state => state);
  let display;

  if(app.environment === 'classroom'){
    display = false;
  }else{
    display = true;
  }

  return (
      <div>
          <footer id="footer-main" style={ { display:display ? 'block' : 'none' } }>
              <div className="footer footer-dark">
                  <div className="container">
      
                      <div className="row align-items-center justify-content-md-between py-4 mt-4 border-top mx-0">
                          <div className="col-md-6 mb-3 mb-md-0">
                              <div className="copyright text-sm font-weight-bold text-center text-md-left">
                  © {new Date().getFullYear()} {' '}
                                  <a
                    href={ window.location.origin }
                    className="font-weight-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    codemarka                                   </a>
                  . All rights reserved.
                              </div>
                          </div>
                          <div className="col-md-6">
                              <ul className="nav align-items-center justify-content-center justify-content-md-end">
                                  {/* <li className="nav-item dropdown border-right pr-2">
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
                  </li> */}
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
