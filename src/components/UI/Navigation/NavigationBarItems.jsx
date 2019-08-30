import React from "react";
import { Link } from "react-router-dom";

import * as url from '../../../config/url';

export default function NavigationBarItems() {
  return (
    <div className="collapse navbar-collapse" id="navbar-primary">
      <ul className="navbar-nav ml-lg-auto">
        <li className="nav-item">
          <Link className="nav-link" to={url.HOME}>
            Home
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to={url.ABOUT}>
            About
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to={url.CONTACT}>
            Support
          </Link>
        </li>

        <li className="nav-item ">
          <Link className="nav-link" to={url.AUTH_SIGN_IN}>
            Login
          </Link>
        </li>
{/* 
        <li className="nav-item dropdown dropdown-animate" data-toggle="hover">
          <Link
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            to="/support"
          >
            Services
          </Link>
          <div className="dropdown-menu">
            <div className="dropdown-menu-links rounded-bottom delimiter-top p-4">
              <div className="row">
                <div className="col-sm-6">
                  <Link
                    to="pages/webdesgin"
                    className="dropdown-item"
                  >
                    Web Design
                  </Link>
                  </div>
                <div className="col-sm-6">
                  <a
                    href="docs/styleguide/icons.html"
                    className="dropdown-item"
                  >
                    Icons
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
}
