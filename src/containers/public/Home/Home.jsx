import React from "react";
import Button from "../../../components/Partials/Button";
import {Link} from 'react-router-dom';

import "../styles.css";
export default function Home() {
  return (
    <div className="header-container-fluid">
      <section className="header-bg slice py-8 bg-dark bg-cover bg-size--cover">
        <span className="mask bg-gradient-dark opacity-9" />
        <div className="container d-flex align-items-center text-center text-lg-left py-5">
          <div className="col px-0">
            <div className="row row-grid align-items-center">
              <div className="col-lg-8 text-center text-lg-left">
                <h1 className="text-white mb-4">
                  We built incredible web products for Small &amp;
                  Big Interprise
                </h1>
                <p className="lead text-white opacity-8">
                  For over 15 years, we pride ourselves on our commitment to
                  excellence, as well as our ability to deliver for our
                  clients.
                </p>
                <div className="mt-5">
                  <Button
                    color="warning"
                    size='lg'
                    icon='btn-icon'
                  >
                    <span className="btn-inner--icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-edit-3"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </span>
                    <Link to='/contact-us' className="btn-inner--text text-white">Contact us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
